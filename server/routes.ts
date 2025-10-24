import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertJobSchema,
  insertEmployerSchema,
  insertApplicationSchema,
  insertContactSubmissionSchema,
  insertEmployerSubmissionSchema,
  insertJobAlertSchema,
} from "@shared/schema";
import { z } from "zod";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Jobs API
  app.get("/api/jobs", async (req, res) => {
    try {
      const filters = {
        keyword: req.query.keyword as string | undefined,
        country: req.query.country as string | undefined,
        city: req.query.city as string | undefined,
        category: req.query.category as string | undefined,
        experienceLevel: req.query.experience as string | undefined,
        contractType: req.query.contractType as string | undefined,
        featured: req.query.featured === 'true' ? true : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      };

      const jobs = await storage.getJobs(filters);
      res.json(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
  });

  app.get("/api/jobs/:slug", async (req, res) => {
    try {
      const job = await storage.getJobBySlug(req.params.slug);
      
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      res.json(job);
    } catch (error) {
      console.error('Error fetching job:', error);
      res.status(500).json({ error: 'Failed to fetch job' });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const validatedData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(validatedData);
      res.status(201).json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid job data', details: error.errors });
      }
      console.error('Error creating job:', error);
      res.status(500).json({ error: 'Failed to create job' });
    }
  });

  // Employers API
  app.get("/api/employers/:id", async (req, res) => {
    try {
      const employer = await storage.getEmployer(req.params.id);
      
      if (!employer) {
        return res.status(404).json({ error: 'Employer not found' });
      }

      res.json(employer);
    } catch (error) {
      console.error('Error fetching employer:', error);
      res.status(500).json({ error: 'Failed to fetch employer' });
    }
  });

  app.post("/api/employers", async (req, res) => {
    try {
      const validatedData = insertEmployerSchema.parse(req.body);
      const employer = await storage.createEmployer(validatedData);
      res.status(201).json(employer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid employer data', details: error.errors });
      }
      console.error('Error creating employer:', error);
      res.status(500).json({ error: 'Failed to create employer' });
    }
  });

  // Applications API
  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid application data', details: error.errors });
      }
      console.error('Error creating application:', error);
      res.status(500).json({ error: 'Failed to submit application' });
    }
  });

  app.get("/api/applications/job/:jobId", async (req, res) => {
    try {
      const applications = await storage.getApplicationsByJob(req.params.jobId);
      res.json(applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ error: 'Failed to fetch applications' });
    }
  });

  // Contact submissions API
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send to Google Sheet webhook (non-blocking)
      const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
      
      if (webhookUrl) {
        // Build the full CV URL if attachmentUrl exists
        const cvUrl = validatedData.attachmentUrl 
          ? `${req.protocol}://${req.get('host')}${validatedData.attachmentUrl}`
          : '';
        
        const googleSheetData = {
          fullName: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || '',
          country: validatedData.country || '',
          subject: validatedData.subject,
          message: validatedData.message,
          cvUrl: cvUrl
        };

        // Send to Google Sheet (don't wait for response)
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(googleSheetData)
        }).catch(err => {
          console.error('Failed to send to Google Sheet:', err);
        });
      }
      
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid contact data', details: error.errors });
      }
      console.error('Error creating contact submission:', error);
      res.status(500).json({ error: 'Failed to submit contact form' });
    }
  });

  // Employer submissions API
  app.post("/api/employer-submissions", async (req, res) => {
    try {
      const validatedData = insertEmployerSubmissionSchema.parse(req.body);
      const submission = await storage.createEmployerSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid submission data', details: error.errors });
      }
      console.error('Error creating employer submission:', error);
      res.status(500).json({ error: 'Failed to submit employer form' });
    }
  });

  // Job alerts API
  app.post("/api/job-alerts", async (req, res) => {
    try {
      const validatedData = insertJobAlertSchema.parse(req.body);
      const alert = await storage.createJobAlert(validatedData);
      res.status(201).json(alert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid alert data', details: error.errors });
      }
      console.error('Error creating job alert:', error);
      res.status(500).json({ error: 'Failed to create job alert' });
    }
  });

  // CV Upload API - using Vercel Blob Storage (free on Hobby plan)
  app.post("/api/cv/upload", async (req, res) => {
    try {
      const { filename, fileData, fileType } = req.body;
      
      if (!filename || !fileData || !fileType) {
        return res.status(400).json({ error: 'Filename, fileData, and fileType are required' });
      }

      // Server-side validation for file type (REQUIRED)
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(fileType)) {
        return res.status(400).json({ error: 'Invalid file type. Only PDF and Word documents are allowed.' });
      }

      // Decode base64 file data
      const fileBuffer = Buffer.from(fileData, 'base64');
      
      // Server-side validation for file size (REQUIRED)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (fileBuffer.length > maxSize) {
        return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
      }

      const objectStorageService = new ObjectStorageService();
      const cvUrl = await objectStorageService.uploadCV(filename, fileBuffer);
      
      res.json({ cvUrl });
    } catch (error) {
      console.error('Error uploading CV:', error);
      res.status(500).json({ error: 'Failed to upload CV' });
    }
  });

  // Note: With Vercel Blob, CVs are served directly from Vercel's CDN
  // The blob URLs are public and include the full path to the file
  // No custom route needed as CVs are accessible via their blob URL

  const httpServer = createServer(app);

  return httpServer;
}
