// Factory function that creates the Express app without HTTP server
// Can be used for both Replit (server/index.ts) and Vercel (api/)
import express, { type Request, Response, NextFunction } from "express";
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

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Logging middleware
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }
        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }
        console.log(logLine);
      }
    });

    next();
  });

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
      
      // Send to Google Sheets if webhook URL is configured
      if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
        try {
          const webhookData = {
            date: new Date().toLocaleDateString('fr-FR'),
            fullName: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone || '',
            country: validatedData.country || '',
            subject: validatedData.subject,
            message: validatedData.message,
            cvUrl: validatedData.attachmentUrl || ''
          };

          await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(webhookData)
          });
        } catch (webhookError) {
          console.error('Error sending to Google Sheets:', webhookError);
        }
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
        return res.status(400).json({ error: 'Invalid employer submission data', details: error.errors });
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
        return res.status(400).json({ error: 'Invalid job alert data', details: error.errors });
      }
      console.error('Error creating job alert:', error);
      res.status(500).json({ error: 'Failed to create job alert' });
    }
  });

  // CV Upload endpoint for Vercel Blob
  app.post("/api/cv/upload", async (req, res) => {
    try {
      const { filename, file } = req.body;
      
      if (!filename || !file) {
        return res.status(400).json({ error: 'Filename and file are required' });
      }
      
      const objectStorageService = new ObjectStorageService();
      const fileBuffer = Buffer.from(file, 'base64');
      const cvUrl = await objectStorageService.uploadCV(filename, fileBuffer);
      
      res.json({ url: cvUrl });
    } catch (error) {
      console.error('Error uploading CV:', error);
      res.status(500).json({ error: 'Failed to upload CV' });
    }
  });

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });

  return app;
}
