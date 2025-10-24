// Object Storage Service pour Vercel - Utilise Vercel Blob Storage (gratuit)
import { put, head, del } from '@vercel/blob';
import { Response } from "express";
import { randomUUID } from "crypto";

export class ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, ObjectNotFoundError.prototype);
  }
}

// Service de stockage utilisant Vercel Blob (gratuit sur plan Hobby)
export class ObjectStorageService {
  constructor() {}

  // Downloads an object to the response
  async downloadObject(url: string, res: Response, cacheTtlSec: number = 3600) {
    try {
      // Fetch the blob from Vercel Blob Storage
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new ObjectNotFoundError();
      }

      const contentType = response.headers.get('content-type') || 'application/octet-stream';
      const contentLength = response.headers.get('content-length');
      
      // Set appropriate headers
      res.set({
        "Content-Type": contentType,
        "Content-Length": contentLength || undefined,
        "Cache-Control": `private, max-age=${cacheTtlSec}`,
      });

      // Stream the file to the response
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

        // Convert Web Stream to Node Stream
        const nodeStream = require('stream').Readable.from(stream);
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
  async getCVUploadURL(filename: string): Promise<{ uploadURL: string; objectPath: string }> {
    // Sanitize filename
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const objectId = randomUUID();
    const blobPath = `cvs/${objectId}-${sanitizedFilename}`;

    // With Vercel Blob, we return a special marker that tells the frontend
    // to upload directly using the Vercel Blob client-side API
    // The actual upload will be handled by a separate API endpoint
    
    return {
      uploadURL: `/api/cv/upload`,
      objectPath: blobPath
    };
  }

  // Upload a CV file to Vercel Blob Storage
  async uploadCV(filename: string, fileContent: Buffer): Promise<string> {
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const objectId = randomUUID();
    const blobPath = `cvs/${objectId}-${sanitizedFilename}`;

    // Upload to Vercel Blob
    const blob = await put(blobPath, fileContent, {
      access: 'public',
      addRandomSuffix: false,
    });

    return blob.url;
  }

  // Gets the blob URL from the object path
  async getObjectURL(objectPath: string): Promise<string> {
    // For Vercel Blob, we need to reconstruct the full URL
    // The blob URLs are stored in the database, so we just return them
    return objectPath;
  }

  // Check if an object exists
  async objectExists(url: string): Promise<boolean> {
    try {
      const metadata = await head(url);
      return !!metadata;
    } catch {
      return false;
    }
  }

  // Delete an object
  async deleteObject(url: string): Promise<void> {
    await del(url);
  }
}
