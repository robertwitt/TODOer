import { NextFunction, Request, Response } from "express";
import TaskService from "../service/task";

/**
 * Handler of /Tasks/{id}
 * @param req the request
 * @param res the response
 * @param next pointer to next handler
 */
export async function getTask(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const taskId = Number(req.params.id);
  if (!taskId) {
    next(new Error("Task ID is required"));
  }

  try {
    const service = new TaskService();
    const task = await service.getTask(taskId);
    task ? res.json(task) : res.status(404);
    next();
  } catch (err) {
    next(err);
  }
}
