import type { Request, Response, NextFunction } from "express";
export const errorHandler = (err: Error, _req: Request, res: Response): void => {
  res.status(500).send({
    message: err.message || "Internal Server Error",
    error: err,
  });
};