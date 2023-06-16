import { Response, Request, NextFunction } from 'express';

export const setVersion =
  (version: number) => (req: Request, res: Response, next: NextFunction) => {

    (req as any).apiVersion = version;
    next();
  };
