import CodeList from "./codeList";

export type TaskStatusCode = string;

export type TaskStatusName = string;

/**
 * Task status code list
 */
export default class TaskStatus extends CodeList<
  TaskStatusCode,
  TaskStatusName
> {}
