// src/middlewares/validation.middleware.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { HttpException } from '@exceptions/HttpException';

type ValidationTarget = 'body' | 'query' | 'params';

const validationMiddleware = (schema: ZodSchema, target: ValidationTarget = 'body'): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req[target]);
      req[target] = result; // Overwrite with parsed data
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors.map(err => `${err.path.join('.')} is ${err.message}`).join(', ');
        next(new HttpException(400, message));
      } else {
        next(error);
      }
    }
  };
};

export default validationMiddleware;
