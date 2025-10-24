import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Employers table
export const employers = pgTable("employers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logo: text("logo"),
  about: text("about"),
  website: text("website"),
  whatsappNumber: text("whatsapp_number").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Jobs table with bilingual fields
export const jobs = pgTable("jobs", {
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
  country: text("country").notNull(), // KSA, UAE, QAT
  city: text("city").notNull(),
  category: text("category").notNull(),
  contractType: text("contract_type").notNull(),
  experienceLevel: text("experience_level").notNull(),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  currency: text("currency").notNull(), // SAR, AED, QAR
  benefits: json("benefits").$type<string[]>().default([]),
  visaSponsorship: boolean("visa_sponsorship").default(false).notNull(),
  relocation: boolean("relocation").default(false).notNull(),
  housing: boolean("housing").default(false).notNull(),
  remote: boolean("remote").default(false).notNull(),
  urgent: boolean("urgent").default(false).notNull(),
  postedAt: timestamp("posted_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  status: text("status").default("published").notNull(), // draft, published, archived
  featured: boolean("featured").default(false).notNull(),
  employerId: varchar("employer_id").notNull().references(() => employers.id),
  externalApplyUrl: text("external_apply_url"),
  whatsappRecipient: text("whatsapp_recipient"),
});

// Applications table
export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").notNull().references(() => jobs.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  countryOfOrigin: text("country_of_origin"), // TN, MA, DZ
  cvUrl: text("cv_url"),
  message: text("message"),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
});

// Contact submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  country: text("country"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  attachmentUrl: text("attachment_url"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

// Employer submissions (from /hire-with-us form)
export const employerSubmissions = pgTable("employer_submissions", {
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
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

// Job alerts subscriptions
export const jobAlerts = pgTable("job_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  phone: text("phone"),
  countries: json("countries").$type<string[]>().default([]),
  categories: json("categories").$type<string[]>().default([]),
  keywords: text("keywords"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  active: boolean("active").default(true).notNull(),
});

// Relations
export const employersRelations = relations(employers, ({ many }) => ({
  jobs: many(jobs),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  employer: one(employers, {
    fields: [jobs.employerId],
    references: [employers.id],
  }),
  applications: many(applications),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  job: one(jobs, {
    fields: [applications.jobId],
    references: [jobs.id],
  }),
}));

// Insert schemas
export const insertEmployerSchema = createInsertSchema(employers).omit({
  id: true,
  createdAt: true,
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  postedAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  appliedAt: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
});

export const insertEmployerSubmissionSchema = createInsertSchema(employerSubmissions).omit({
  id: true,
  submittedAt: true,
});

export const insertJobAlertSchema = createInsertSchema(jobAlerts).omit({
  id: true,
  createdAt: true,
});

// Types
export type Employer = typeof employers.$inferSelect;
export type InsertEmployer = z.infer<typeof insertEmployerSchema>;

export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;

export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

export type EmployerSubmission = typeof employerSubmissions.$inferSelect;
export type InsertEmployerSubmission = z.infer<typeof insertEmployerSubmissionSchema>;

export type JobAlert = typeof jobAlerts.$inferSelect;
export type InsertJobAlert = z.infer<typeof insertJobAlertSchema>;

// Extended type for jobs with employer data
export type JobWithEmployer = Job & { employer: Employer };
