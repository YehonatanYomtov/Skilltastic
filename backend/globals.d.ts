import { Request } from "express";
import { File } from "multer";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MODE: "development" | "production";
      PORT: string;
      PWD: string;
      PGHOST: string;
      PGPORT: string;
      PGUSER: string;
      PGDATABASE: string;
      PGPASSWORD: string;
    }
  }
}

interface MulterRequest extends Request {
  file: File;
}

interface MulterRequestMultiple extends Request {
  files: File[];
}

export {};
