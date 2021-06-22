import { NextFunction, Request, Response } from "express";
import { ApiError } from "../service/error";
import TaskListService from "../service/taskList";

/**
 * Handler of GET /TaskLists/{id}
 * @param req the request
 * @param res the response
 * @param next pointer to next handler
 */
export async function getTaskList(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const listId = Number(req.params.id);
  if (!listId) {
    next(ApiError.badRequest("Task ID is required"));
    return;
  }

  try {
    const service = new TaskListService();
    const list = await service.getTaskList(listId);
    res.json(list);
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Handler of GET /TaskLists
 * @param req the request
 * @param res the response
 * @param next pointer to next handler
 */
export async function getTaskLists(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const list = await new TaskListService().findTaskLists();
    res.json({ value: list });
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Handler of GET /TaskLists/{id}/assignedTasks
 * @param req the request
 * @param res the response
 * @param next pointer to next handler
 */
export async function getTaskListWithTasks(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const listId = Number(req.params.id);
  if (!listId) {
    next(ApiError.badRequest("Task ID is required"));
    return;
  }

  try {
    const service = new TaskListService();
    const list = await service.getTaskListWithTasks(listId);
    res.json(list);
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Handler of POST /TaskLists
 * @param req the request
 * @param res the response
 * @param next pointer to next handler
 */
export async function createTaskList(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const list = await new TaskListService().createTaskList(req.body);
    res.status(201).json(list);
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Handler of PATCH /TaskLists/{id}
 * @param req the request
 * @param res the response
 * @param next pointer to next handler
 */
export async function updateTaskList(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const taskListId = Number(req.params.id);
  if (!taskListId) {
    next(ApiError.badRequest("Task ID is required"));
    return;
  }
  const body = req.body;

  try {
    const service = new TaskListService();
    const task = await service.updateTaskList(taskListId, {
      title: body.title,
      color: body.color,
    });
    res.json(task);
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Handler of DELETE /TaskLists/{id}
 * @param req the request
 * @param res the response
 * @param next pointer to next handler
 */
export async function deleteTaskList(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const taskListId = Number(req.params.id);
  if (!taskListId) {
    next(ApiError.badRequest("Task ID is required"));
    return;
  }

  try {
    const service = new TaskListService();
    await service.deleteTaskList(taskListId);
    res.status(204).send();
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Handler of POST /TaskLists/{id}/makeDefault
 * @param req the request
 * @param res the response
 * @param next pointer to next handler
 */
export async function makeTaskListTheDefault(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const taskListId = Number(req.params.id);
  if (!taskListId) {
    next(ApiError.badRequest("Task ID is required"));
    return;
  }

  try {
    const service = new TaskListService();
    await service.makeTaskListTheDefault(taskListId);
    res.status(204).send();
    next();
  } catch (err) {
    next(err);
  }
}
