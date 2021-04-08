import { TaskListId, TaskListRef } from "../../model/taskList";
import { TaskListRepository } from "../taskList";
import { AbstractMockRepository } from "./abstract";

export default class TaskListMockRepository
  extends AbstractMockRepository
  implements TaskListRepository {
  findRefById(id: TaskListId): Promise<TaskListRef | undefined> {
    const listRef = this.db.taskLists.get(id)?.ref;
    return Promise.resolve(listRef);
  }
}
