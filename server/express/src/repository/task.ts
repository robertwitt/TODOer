import Task, { TaskId } from "../model/task";

export interface TaskRepository {
  getOne(id: TaskId): Promise<Task | undefined>;
}
