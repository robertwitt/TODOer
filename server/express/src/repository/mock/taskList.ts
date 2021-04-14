import TaskList, { TaskListId } from "../../model/taskList";
import { TaskListRepository } from "../taskList";
import { AbstractMockRepository } from "./abstract";

export default class TaskListMockRepository
  extends AbstractMockRepository
  implements TaskListRepository {
  findById(id: TaskListId): Promise<TaskList | undefined> {
    return Promise.resolve(this.db.taskLists.get(id));
  }

  async getOne(id: TaskListId): Promise<TaskList> {
    const list = await this.findById(id);
    if (!list) {
      throw new Error(`A task list with ID ${id} does not exist`);
    }
    return list;
  }

  findAll(): Promise<TaskList[]> {
    return Promise.resolve(Array.from(this.db.taskLists.values()));
  }
}
