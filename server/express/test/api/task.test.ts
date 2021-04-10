import app from "../../src/app";
import supertest from "supertest";
import MockDb from "../../src/repository/mock/db";

describe("The API server", () => {
  const request = supertest(app);

  beforeEach(() => MockDb.instance.reset());

  it("can read a single task by ID", async () => {
    const { body } = await request.get("/beta/Tasks/1").expect(200);
    expect(body).toMatchSnapshot();
  });

  it("cannot read a task by an unknown ID", async () => {
    await request.get("/beta/Tasks/99").expect(404);
  });

  it("can read all tasks", async () => {
    const { body } = await request.get("/beta/Tasks").expect(200);
    expect(body).toEqual({
      value: expect.arrayContaining([expect.objectContaining({ id: 1 })]),
    });
  });

  it("can filter tasks by collection", async () => {
    const { body } = await request.get("/beta/Tasks?collection=42").expect(200);
    expect(body).toMatchSnapshot();
  });

  it("can create a new task", async () => {
    const { body } = await request
      .post("/beta/Tasks")
      .send({
        collection: 1,
        title: "new task",
        dueDate: "2021-04-08",
        isPlannedForMyDay: true,
      })
      .expect(201);
    expect(body).toMatchSnapshot();
    await request.get(`/beta/Tasks/${body.id}`).expect(200);
  });

  it("fails creating a task with malformed due date", async () => {
    await request
      .post("/beta/Tasks")
      .send({ collection: 1, dueDate: "20210408" })
      .expect(400);
  });

  it("fails creating a task without collection", async () => {
    await request.post("/beta/Tasks").send({ title: "new task" }).expect(400);
  });

  it("can update a task", async () => {
    const { body } = await request
      .patch("/beta/Tasks/1")
      .send({
        dueDate: "2021-04-10",
        dueTime: "18:00:00",
        isPlannedForMyDay: true,
      })
      .expect(200);
    expect(body).toMatchSnapshot();
  });

  it("fails updating a task with unknown collection", async () => {
    await request.patch("/beta/Tasks/1").send({ collection: 99 }).expect(400);
  });

  it("fails updating a task with nulled collection", async () => {
    await request.patch("/beta/Tasks/1").send({ collection: null }).expect(400);
  });
});
