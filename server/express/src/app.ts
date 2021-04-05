import express from "express";
import http from "http";
import { handleError } from "./middleware/error";

const app = express();

// Setup body parsers
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

// Add error handler
app.use(handleError);

http.createServer(app).listen(3000);
console.log("Server started and listens to port 3000");
