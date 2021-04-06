import { Request, Response } from "express";

/**
 * Express handler for errors.
 * @param err error that occurred
 * @param _req the request
 * @param res the response
 * @param _next pointer to next handler
 */
export function handleError(err: Error, _req: Request, res: Response): void {
  console.error(err);
  res.status(500).render("error", { error: err });
}
