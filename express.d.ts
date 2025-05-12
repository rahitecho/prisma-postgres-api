// src/types/express.d.ts
import { user } from '@prisma/client'; // Adjust the import path as needed

declare global {
  namespace Express {
    interface Request {
      user?: user;
    }
  }
}
