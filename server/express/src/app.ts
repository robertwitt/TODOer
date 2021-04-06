import express, { Application } from "express";
import { handleError } from "./middleware/error";

/**
 * Create the express app for this project.
 * @returns express app
 */
export function createApp(): Application {
  const app = express();

  // Setup body parsers
  app.use(express.json());
  app.use(express.text());
  app.use(express.urlencoded({ extended: false }));

  // Add error handler
  app.use(handleError);

  return app;
}
