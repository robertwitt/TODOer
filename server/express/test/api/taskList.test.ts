import supertest from "supertest";
import app from "../../src/app";
import MockDb from "../../src/repository/mock/db";

describe("The API server", () => {
  const request = supertest(app);

  beforeEach(() => MockDb.instance.reset());

  it("can read a single task list by ID", async () => {
    const { body } = await request.get("/beta/TaskLists/1").expect(200);
    expect(body).toMatchSnapshot();
  });
});
