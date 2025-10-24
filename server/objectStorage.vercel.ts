// Object Storage Service pour Vercel - Utilise Google Cloud Storage directement
import { Storage, File } from "@google-cloud/storage";
import { Response } from "express";
import { randomUUID } from "crypto";

// Configuration pour Google Cloud Storage sur Vercel
function getStorageClient() {
  const credentials = process.env.GCS_CREDENTIALS;
  const projectId = process.env.GCS_PROJECT_ID;

  if (!credentials || !projectId) {
    throw new Error(
      "GCS_CREDENTIALS et GCS_PROJECT_ID doivent être configurés dans les variables d'environnement Vercel.\n" +
      "Voir DEPLOIEMENT_VERCEL.md pour plus d'informations."
    );
  }

  try {
    const credentialsObj = JSON.parse(credentials);
    
    return new Storage({
      projectId,
      credentials: credentialsObj,
    });
  } catch (error) {
    throw new Error(
      "Erreur lors du parsing de GCS_CREDENTIALS. Assurez-vous que c'est un JSON valide.\n" +
      "Format attendu: {\"type\":\"service_account\", \"project_id\":\"...\", ...}"
    );
  }
}

export const objectStorageClient = getStorageClient();

export class ObjectNotFoundError extends Error {
  constructor() {
    super("Object not found");
    this.name = "ObjectNotFoundError";
    Object.setPrototypeOf(this, ObjectNotFoundError.prototype);
  }
}

// The object storage service is used to interact with the object storage service.
export class ObjectStorageService {
  constructor() {}

  // Gets the bucket name from environment variable
  getBucketName(): string {
    const bucketName = process.env.GCS_BUCKET_NAME;
    if (!bucketName) {
      throw new Error(
        "GCS_BUCKET_NAME not set. Créez un bucket GCS et configurez GCS_BUCKET_NAME dans Vercel."
      );
    }
    return bucketName;
  }

  // Downloads an object to the response.
  async downloadObject(file: File, res: Response, cacheTtlSec: number = 3600) {
    try {
      // Get file metadata
      const [metadata] = await file.getMetadata();
      
      // Set appropriate headers
      res.set({
        "Content-Type": metadata.contentType || "application/octet-stream",
        "Content-Length": metadata.size,
        "Cache-Control": `private, max-age=${cacheTtlSec}`,
      });

      // Stream the file to the response
      const stream = file.createReadStream();

      stream.on("error", (err: Error) => {
        console.error("Stream error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Error streaming file" });
        }
      });

      stream.pipe(res);
    } catch (error) {
      console.error("Error downloading file:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error downloading file" });
      }
    }
  }

  // Gets the upload URL for a CV file
  async getCVUploadURL(filename: string): Promise<{ uploadURL: string; objectPath: string }> {
    const bucketName = this.getBucketName();
    
    // Sanitize filename
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const objectId = randomUUID();
    const objectName = `cvs/${objectId}-${sanitizedFilename}`;

    const bucket = objectStorageClient.bucket(bucketName);
    const file = bucket.file(objectName);

    // Generate signed URL for upload (PUT method)
    const [uploadURL] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: 'application/pdf', // Adjust based on your needs
    });

    return {
      uploadURL,
      objectPath: `/objects/cvs/${objectId}-${sanitizedFilename}`
    };
  }

  // Gets the object entity file from the object path.
  async getObjectEntityFile(objectPath: string): Promise<File> {
    if (!objectPath.startsWith("/objects/")) {
      throw new ObjectNotFoundError();
    }

    const bucketName = this.getBucketName();
    
    // Extract the object name from the path
    // /objects/cvs/uuid-filename.pdf -> cvs/uuid-filename.pdf
    const objectName = objectPath.replace("/objects/", "");
    
    const bucket = objectStorageClient.bucket(bucketName);
    const objectFile = bucket.file(objectName);
    
    const [exists] = await objectFile.exists();
    if (!exists) {
      throw new ObjectNotFoundError();
    }
    
    return objectFile;
  }
}
