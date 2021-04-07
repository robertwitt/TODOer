import { NextFunction, Request, Response } from "express";

/**
 * Express handler for errors.
 * @param err error that occurred
 * @param req the request
 * @param res the response
 * @param next pointer to next handler
 */
export function handleError(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  console.error(err);
  res.status(500).render("error", { error: err });
}
