import { NextFunction, Request, Response } from "express";

/**
 * Express handler for errors.
 * @param err error that occured
 * @param _req the request
 * @param res the response
 * @param _next pointer to next handler
 */
export function handleError(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message, errors: err.errors });
}
