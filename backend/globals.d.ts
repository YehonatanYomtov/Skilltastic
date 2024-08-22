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

export {};
