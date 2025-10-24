// Referenced from javascript_database blueprint integration
import {
  jobs,
  employers,
  applications,
  contactSubmissions,
  employerSubmissions,
  jobAlerts,
  type Job,
  type Employer,
  type Application,
  type ContactSubmission,
  type EmployerSubmission,
  type JobAlert,
  type InsertJob,
  type InsertEmployer,
  type InsertApplication,
  type InsertContactSubmission,
  type InsertEmployerSubmission,
  type InsertJobAlert,
  type JobWithEmployer,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql, like, gte } from "drizzle-orm";

export interface IStorage {
  // Jobs
  getJobs(filters?: JobFilters): Promise<JobWithEmployer[]>;
  getJobBySlug(slug: string): Promise<JobWithEmployer | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: string, job: Partial<InsertJob>): Promise<Job | undefined>;
  deleteJob(id: string): Promise<void>;
  
  // Employers
  getEmployer(id: string): Promise<Employer | undefined>;
  createEmployer(employer: InsertEmployer): Promise<Employer>;
  
  // Applications
  createApplication(application: InsertApplication): Promise<Application>;
  getApplicationsByJob(jobId: string): Promise<Application[]>;
  
  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Employer Submissions
  createEmployerSubmission(submission: InsertEmployerSubmission): Promise<EmployerSubmission>;
  
  // Job Alerts
  createJobAlert(alert: InsertJobAlert): Promise<JobAlert>;
}

export interface JobFilters {
  keyword?: string;
  country?: string;
  city?: string;
  category?: string;
  experienceLevel?: string;
  contractType?: string;
  featured?: boolean;
  status?: string;
  limit?: number;
}

export class DatabaseStorage implements IStorage {
  async getJobs(filters: JobFilters = {}): Promise<JobWithEmployer[]> {
    let query = db.select().from(jobs).leftJoin(employers, eq(jobs.employerId, employers.id));

    const conditions = [];

    if (filters.keyword) {
      conditions.push(
        sql`(${jobs.titleEn} ILIKE ${`%${filters.keyword}%`} OR ${jobs.titleAr} ILIKE ${`%${filters.keyword}%`} OR ${jobs.descriptionEn} ILIKE ${`%${filters.keyword}%`} OR ${jobs.descriptionAr} ILIKE ${`%${filters.keyword}%`})`
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

    if (filters.featured !== undefined) {
      conditions.push(eq(jobs.featured, filters.featured));
    }

    if (filters.status) {
      conditions.push(eq(jobs.status, filters.status));
    } else {
      conditions.push(eq(jobs.status, 'published'));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    query = query.orderBy(desc(jobs.postedAt)) as any;

    if (filters.limit) {
      query = query.limit(filters.limit) as any;
    }

    const results = await query;

    return results.map((row) => ({
      ...(row.jobs as Job),
      employer: row.employers as Employer,
    }));
  }

  async getJobBySlug(slug: string): Promise<JobWithEmployer | undefined> {
    const result = await db
      .select()
      .from(jobs)
      .leftJoin(employers, eq(jobs.employerId, employers.id))
      .where(eq(jobs.slug, slug))
      .limit(1);

    if (result.length === 0) return undefined;

    const row = result[0];
    return {
      ...(row.jobs as Job),
      employer: row.employers as Employer,
    };
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const [job] = await db.insert(jobs).values(insertJob).returning();
    return job;
  }

  async updateJob(id: string, updateData: Partial<InsertJob>): Promise<Job | undefined> {
    const [job] = await db
      .update(jobs)
      .set(updateData)
      .where(eq(jobs.id, id))
      .returning();
    return job || undefined;
  }

  async deleteJob(id: string): Promise<void> {
    await db.delete(jobs).where(eq(jobs.id, id));
  }

  async getEmployer(id: string): Promise<Employer | undefined> {
    const [employer] = await db.select().from(employers).where(eq(employers.id, id));
    return employer || undefined;
  }

  async createEmployer(insertEmployer: InsertEmployer): Promise<Employer> {
    const [employer] = await db.insert(employers).values(insertEmployer).returning();
    return employer;
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const [application] = await db.insert(applications).values(insertApplication).returning();
    return application;
  }

  async getApplicationsByJob(jobId: string): Promise<Application[]> {
    return await db.select().from(applications).where(eq(applications.jobId, jobId));
  }

  async createContactSubmission(
    insertSubmission: InsertContactSubmission
  ): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(insertSubmission).returning();
    return submission;
  }

  async createEmployerSubmission(
    insertSubmission: InsertEmployerSubmission
  ): Promise<EmployerSubmission> {
    const [submission] = await db.insert(employerSubmissions).values(insertSubmission).returning();
    return submission;
  }

  async createJobAlert(insertAlert: InsertJobAlert): Promise<JobAlert> {
    const [alert] = await db.insert(jobAlerts).values(insertAlert).returning();
    return alert;
  }
}

export const storage = new DatabaseStorage();
