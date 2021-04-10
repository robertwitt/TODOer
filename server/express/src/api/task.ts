import { NextFunction, Request, Response } from "express";
import { ApiError } from "../service/error";
import TaskService from "../service/task";

/**
 * Handler of GET /Tasks/{id}
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
    next(new ApiError(400, "Task ID is required"));
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

/**
 * Handler of GET /Tasks
 * @param req the request
 * @param res the response
 * @param next pointer to next handler
 */
export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const query = req.query;
  const collection = query.collection ? Number(query.collection) : undefined;

  try {
    const service = new TaskService();
    const tasks = await service.findTasks({ collection });
    res.json({ value: tasks });
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Handler of POST /Tasks
 * @param req the request
 * @param res the response
 * @param next pointer to next handler
 */
export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body = req.body;
  if (!body.collection) {
    next(new ApiError(400, "Collection is required"));
  }

  try {
    const service = new TaskService();
    const task = await service.createTask({
      title: body.title,
      collection: body.collection,
      dueDate: body.dueDate,
      dueTime: body.dueTime,
      priority: body.priority,
      isPlannedForMyDay: body.isPlannedForMyDay,
    });
    res.status(201).json(task);
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Handler of PATH /Tasks/{id}
 * @param req the request
 * @param res the response
 * @param next pointer to next handler
 */
export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const taskId = Number(req.params.id);
  if (!taskId) {
    next(new ApiError(400, "Task ID is required"));
  }
  const body = req.body;

  try {
    const service = new TaskService();
    const task = await service.updateTask(taskId, {
      title: body.title,
      collection: body.collection,
      dueDate: body.dueDate,
      dueTime: body.dueTime,
      isPlannedForMyDay: body.isPlannedForMyDay,
    });
    res.json(task);
    next();
  } catch (err) {
    next(err);
  }
}
