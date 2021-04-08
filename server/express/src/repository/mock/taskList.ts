import { TaskListId, TaskListRef } from "../../model/taskList";
import { TaskListRepository } from "../taskList";
import MockDb from "./db";

export default class TaskListMockRepository implements TaskListRepository {
  private readonly db = MockDb.instance;

  findRefById(id: TaskListId): Promise<TaskListRef | undefined> {
    const listRef = this.db.taskLists.get(id)?.ref;
    return Promise.resolve(listRef);
  }
}
