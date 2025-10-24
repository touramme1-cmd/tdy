var __defProp = Object.defineProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  applications: () => applications,
  applicationsRelations: () => applicationsRelations,
  contactSubmissions: () => contactSubmissions,
  employerSubmissions: () => employerSubmissions,
  employers: () => employers,
  employersRelations: () => employersRelations,
  insertApplicationSchema: () => insertApplicationSchema,
  insertContactSubmissionSchema: () => insertContactSubmissionSchema,
  insertEmployerSchema: () => insertEmployerSchema,
  insertEmployerSubmissionSchema: () => insertEmployerSubmissionSchema,
  insertJobAlertSchema: () => insertJobAlertSchema,
  insertJobSchema: () => insertJobSchema,
  jobAlerts: () => jobAlerts,
  jobs: () => jobs,
  jobsRelations: () => jobsRelations
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var employers = pgTable("employers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logo: text("logo"),
  about: text("about"),
  website: text("website"),
  whatsappNumber: text("whatsapp_number").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var jobs = pgTable("jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleAr: text("title_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  responsibilitiesEn: text("responsibilities_en"),
  responsibilitiesAr: text("responsibilities_ar"),
  requirementsEn: text("requirements_en"),
  requirementsAr: text("requirements_ar"),
  country: text("country").notNull(),
  // KSA, UAE, QAT
  city: text("city").notNull(),
  category: text("category").notNull(),
  contractType: text("contract_type").notNull(),
  experienceLevel: text("experience_level").notNull(),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  currency: text("currency").notNull(),
  // SAR, AED, QAR
  benefits: json("benefits").$type().default([]),
  visaSponsorship: boolean("visa_sponsorship").default(false).notNull(),
  relocation: boolean("relocation").default(false).notNull(),
  housing: boolean("housing").default(false).notNull(),
  remote: boolean("remote").default(false).notNull(),
  urgent: boolean("urgent").default(false).notNull(),
  postedAt: timestamp("posted_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  status: text("status").default("published").notNull(),
  // draft, published, archived
  featured: boolean("featured").default(false).notNull(),
  employerId: varchar("employer_id").notNull().references(() => employers.id),
  externalApplyUrl: text("external_apply_url"),
  whatsappRecipient: text("whatsapp_recipient")
});
var applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").notNull().references(() => jobs.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  countryOfOrigin: text("country_of_origin"),
  // TN, MA, DZ
  cvUrl: text("cv_url"),
  message: text("message"),
  appliedAt: timestamp("applied_at").defaultNow().notNull()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  country: text("country"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  attachmentUrl: text("attachment_url"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull()
});
var employerSubmissions = pgTable("employer_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: text("company_name").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  position: text("position").notNull(),
  salaryRange: text("salary_range"),
  benefits: text("benefits"),
  description: text("description").notNull(),
  requirements: text("requirements"),
  deadline: text("deadline"),
  visaSponsor: boolean("visa_sponsor").default(false).notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull()
});
var jobAlerts = pgTable("job_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  phone: text("phone"),
  countries: json("countries").$type().default([]),
  categories: json("categories").$type().default([]),
  keywords: text("keywords"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  active: boolean("active").default(true).notNull()
});
var employersRelations = relations(employers, ({ many }) => ({
  jobs: many(jobs)
}));
var jobsRelations = relations(jobs, ({ one, many }) => ({
  employer: one(employers, {
    fields: [jobs.employerId],
    references: [employers.id]
  }),
  applications: many(applications)
}));
var applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id]
  })
}));
var insertEmployerSchema = createInsertSchema(employers).omit({
  id: true,
  createdAt: true
});
var insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  postedAt: true
});
var insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  appliedAt: true
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true
});
var insertEmployerSubmissionSchema = createInsertSchema(employerSubmissions).omit({
  id: true,
  submittedAt: true
});
var insertJobAlertSchema = createInsertSchema(jobAlerts).omit({
  id: true,
  createdAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, and, desc, sql as sql2 } from "drizzle-orm";
var DatabaseStorage = class {
  async getJobs(filters = {}) {
    let query = db.select().from(jobs).leftJoin(employers, eq(jobs.employerId, employers.id));
    const conditions = [];
    if (filters.keyword) {
      conditions.push(
        sql2`(${jobs.titleEn} ILIKE ${`%${filters.keyword}%`} OR ${jobs.titleAr} ILIKE ${`%${filters.keyword}%`} OR ${jobs.descriptionEn} ILIKE ${`%${filters.keyword}%`} OR ${jobs.descriptionAr} ILIKE ${`%${filters.keyword}%`})`
      );
    }
    if (filters.country) {
      conditions.push(eq(jobs.country, filters.country));
    }
    if (filters.city) {
      conditions.push(eq(jobs.city, filters.city));
    }
    if (filters.category) {
      conditions.push(eq(jobs.category, filters.category));
    }
    if (filters.experienceLevel) {
      conditions.push(eq(jobs.experienceLevel, filters.experienceLevel));
    }
    if (filters.contractType) {
      conditions.push(eq(jobs.contractType, filters.contractType));
    }
    if (filters.featured !== void 0) {
      conditions.push(eq(jobs.featured, filters.featured));
    }
    if (filters.status) {
      conditions.push(eq(jobs.status, filters.status));
    } else {
      conditions.push(eq(jobs.status, "published"));
    }
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    query = query.orderBy(desc(jobs.postedAt));
    if (filters.limit) {
      query = query.limit(filters.limit);
    }
    const results = await query;
    return results.map((row) => ({
      ...row.jobs,
      employer: row.employers
    }));
  }
  async getJobBySlug(slug) {
    const result = await db.select().from(jobs).leftJoin(employers, eq(jobs.employerId, employers.id)).where(eq(jobs.slug, slug)).limit(1);
    if (result.length === 0) return void 0;
    const row = result[0];
    return {
      ...row.jobs,
      employer: row.employers
    };
  }
  async createJob(insertJob) {
    const [job] = await db.insert(jobs).values(insertJob).returning();
    return job;
  }
  async updateJob(id, updateData) {
    const [job] = await db.update(jobs).set(updateData).where(eq(jobs.id, id)).returning();
    return job || void 0;
  }
  async deleteJob(id) {
    await db.delete(jobs).where(eq(jobs.id, id));
  }
  async getEmployer(id) {
    const [employer] = await db.select().from(employers).where(eq(employers.id, id));
    return employer || void 0;
  }
  async createEmployer(insertEmployer) {
    const [employer] = await db.insert(employers).values(insertEmployer).returning();
    return employer;
  }
  async createApplication(insertApplication) {
    const [application] = await db.insert(applications).values(insertApplication).returning();
    return application;
  }
  async getApplicationsByJob(jobId) {
    return await db.select().from(applications).where(eq(applications.jobId, jobId));
  }
  async createContactSubmission(insertSubmission) {
    const [submission] = await db.insert(contactSubmissions).values(insertSubmission).returning();
    return submission;
  }
  async createEmployerSubmission(insertSubmission) {
    const [submission] = await db.insert(employerSubmissions).values(insertSubmission).returning();
    return submission;
  }
  async createJobAlert(insertAlert) {
    const [alert] = await db.insert(jobAlerts).values(insertAlert).returning();
    return alert;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";

// server/objectStorage.ts
import { put, head, del } from "@vercel/blob";
import { randomUUID } from "crypto";
var ObjectNotFoundError = class _ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, _ObjectNotFoundError.prototype);
  }
};
var ObjectStorageService = class {
  constructor() {
  }
  // Downloads an object to the response
  async downloadObject(url, res, cacheTtlSec = 3600) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new ObjectNotFoundError();
      }
      const contentType = response.headers.get("content-type") || "application/octet-stream";
      const contentLength = response.headers.get("content-length");
      res.set({
        "Content-Type": contentType,
        "Content-Length": contentLength || void 0,
        "Cache-Control": `private, max-age=${cacheTtlSec}`
      });
      if (response.body) {
        const reader = response.body.getReader();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                controller.enqueue(value);
              }
              controller.close();
            } catch (err) {
              controller.error(err);
            }
          }
        });
        const nodeStream = __require("stream").Readable.from(stream);
        nodeStream.pipe(res);
      } else {
        throw new Error("No response body");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error downloading file" });
      }
    }
  }
  // Gets the upload URL for a CV file
  async getCVUploadURL(filename) {
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const objectId = randomUUID();
    const blobPath = `cvs/${objectId}-${sanitizedFilename}`;
    return {
      uploadURL: `/api/cv/upload`,
      objectPath: blobPath
    };
  }
  // Upload a CV file to Vercel Blob Storage
  async uploadCV(filename, fileContent) {
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const objectId = randomUUID();
    const blobPath = `cvs/${objectId}-${sanitizedFilename}`;
    const blob = await put(blobPath, fileContent, {
      access: "public",
      addRandomSuffix: false
    });
    return blob.url;
  }
  // Gets the blob URL from the object path
  async getObjectURL(objectPath) {
    return objectPath;
  }
  // Check if an object exists
  async objectExists(url) {
    try {
      const metadata = await head(url);
      return !!metadata;
    } catch {
      return false;
    }
  }
  // Delete an object
  async deleteObject(url) {
    await del(url);
  }
};

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/jobs", async (req, res) => {
    try {
      const filters = {
        keyword: req.query.keyword,
        country: req.query.country,
        city: req.query.city,
        category: req.query.category,
        experienceLevel: req.query.experience,
        contractType: req.query.contractType,
        featured: req.query.featured === "true" ? true : void 0,
        limit: req.query.limit ? parseInt(req.query.limit) : void 0
      };
      const jobs2 = await storage.getJobs(filters);
      res.json(jobs2);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });
  app2.get("/api/jobs/:slug", async (req, res) => {
    try {
      const job = await storage.getJobBySlug(req.params.slug);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ error: "Failed to fetch job" });
    }
  });
  app2.post("/api/jobs", async (req, res) => {
    try {
      const validatedData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(validatedData);
      res.status(201).json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid job data", details: error.errors });
      }
      console.error("Error creating job:", error);
      res.status(500).json({ error: "Failed to create job" });
    }
  });
  app2.get("/api/employers/:id", async (req, res) => {
    try {
      const employer = await storage.getEmployer(req.params.id);
      if (!employer) {
        return res.status(404).json({ error: "Employer not found" });
      }
      res.json(employer);
    } catch (error) {
      console.error("Error fetching employer:", error);
      res.status(500).json({ error: "Failed to fetch employer" });
    }
  });
  app2.post("/api/employers", async (req, res) => {
    try {
      const validatedData = insertEmployerSchema.parse(req.body);
      const employer = await storage.createEmployer(validatedData);
      res.status(201).json(employer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid employer data", details: error.errors });
      }
      console.error("Error creating employer:", error);
      res.status(500).json({ error: "Failed to create employer" });
    }
  });
  app2.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid application data", details: error.errors });
      }
      console.error("Error creating application:", error);
      res.status(500).json({ error: "Failed to submit application" });
    }
  });
  app2.get("/api/applications/job/:jobId", async (req, res) => {
    try {
      const applications2 = await storage.getApplicationsByJob(req.params.jobId);
      res.json(applications2);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
      if (webhookUrl) {
        const cvUrl = validatedData.attachmentUrl ? `${req.protocol}://${req.get("host")}${validatedData.attachmentUrl}` : "";
        const googleSheetData = {
          fullName: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || "",
          country: validatedData.country || "",
          subject: validatedData.subject,
          message: validatedData.message,
          cvUrl
        };
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(googleSheetData)
        }).catch((err) => {
          console.error("Failed to send to Google Sheet:", err);
        });
      }
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid contact data", details: error.errors });
      }
      console.error("Error creating contact submission:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });
  app2.post("/api/employer-submissions", async (req, res) => {
    try {
      const validatedData = insertEmployerSubmissionSchema.parse(req.body);
      const submission = await storage.createEmployerSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid submission data", details: error.errors });
      }
      console.error("Error creating employer submission:", error);
      res.status(500).json({ error: "Failed to submit employer form" });
    }
  });
  app2.post("/api/job-alerts", async (req, res) => {
    try {
      const validatedData = insertJobAlertSchema.parse(req.body);
      const alert = await storage.createJobAlert(validatedData);
      res.status(201).json(alert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid alert data", details: error.errors });
      }
      console.error("Error creating job alert:", error);
      res.status(500).json({ error: "Failed to create job alert" });
    }
  });
  app2.post("/api/cv/upload", async (req, res) => {
    try {
      const { filename, fileData, fileType } = req.body;
      if (!filename || !fileData || !fileType) {
        return res.status(400).json({ error: "Filename, fileData, and fileType are required" });
      }
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (!allowedTypes.includes(fileType)) {
        return res.status(400).json({ error: "Invalid file type. Only PDF and Word documents are allowed." });
      }
      const fileBuffer = Buffer.from(fileData, "base64");
      const maxSize = 10 * 1024 * 1024;
      if (fileBuffer.length > maxSize) {
        return res.status(400).json({ error: "File too large. Maximum size is 10MB." });
      }
      const objectStorageService = new ObjectStorageService();
      const cvUrl = await objectStorageService.uploadCV(filename, fileBuffer);
      res.json({ cvUrl });
    } catch (error) {
      console.error("Error uploading CV:", error);
      res.status(500).json({ error: "Failed to upload CV" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
