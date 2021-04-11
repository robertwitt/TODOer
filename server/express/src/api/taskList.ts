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
