import OpenApiValidator from "express-openapi-validator";
import express from "express";
import http from "http";
import path from "path";
import { handleError } from "./middleware/error";

const app = express();

// Setup body parsers
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

// Add OpenApiValidator middleware
const apiSpecFilePath = path.join(__dirname, "resources", "api.yaml");
const handlersFolderPath = path.join(__dirname, "api");
app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpecFilePath,
    validateRequests: true,
    validateResponses: true,
    operationHandlers: handlersFolderPath,
  })
);

// Add error handler
app.use(handleError);

http.createServer(app).listen(3000);
console.log("Server started and is listening on port 3000");
