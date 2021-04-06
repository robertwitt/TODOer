import * as apiHandlers from "./api";
import YAML from "yamljs";
import { connector } from "swagger-routes-express";
import express, { Application } from "express";
import path from "path";
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

  // Connect API and app
  const apiDefinition = YAML.load(path.join("resources", "api.yaml"));
  const connect = connector(apiHandlers, apiDefinition);
  connect(app);

  // Add error handler
  app.use(handleError);

  return app;
}
