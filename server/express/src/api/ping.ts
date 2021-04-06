import { Request, Response } from "express";

/**
 * Handler of /ping
 * @param _req the request
 * @param res the response
 */
export function ping(_req: Request, res: Response): void {
  res.json({
    name: "TODOer API",
    description: "RESTful API for the TODOer app",
    version: "beta",
    uptime: process.uptime(),
  });
}
