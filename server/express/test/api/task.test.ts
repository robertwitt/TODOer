import app from "../../src/app";
import supertest from "supertest";

describe("The API server", () => {
  const request = supertest(app);

  it("can read a single task by ID", async () => {
    const { body } = await request.get("/beta/Tasks/1").expect(200);
    expect(body).toMatchSnapshot();
  });

  it("cannot read a task by an unknown ID", async () => {
    await request.get("/beta/Tasks/99").expect(404);
  });
});
