const cds = require("@sap/cds");

async function initDb(db) {
  if (cds.env.env !== "production") {
    return;
  }

  const queries = [];

  const statuses = await db.read("code").from("db.TaskStatuses");
  if (!statuses || !statuses.length) {
    queries.push(
      INSERT.into("db.TaskStatuses")
        .columns("code", "name")
        .rows(["O", "Open"], ["C", "Completed"], ["X", "Cancelled"])
    );
  }

  const priorities = await db.read("code").from("db.TaskPriorities");
  if (!priorities || !priorities.length) {
    queries.push(
      INSERT.into("db.TaskPriorities")
        .columns("code", "name")
        .rows([1, "High"], [3, "Moderate"], [5, "Low"])
    );
  }

  const defaultCollections = await db
    .read("ID")
    .from("db.TaskCollections")
    .where({ isDefault: true });
  if (!defaultCollections || !defaultCollections.length) {
    queries.push(
      INSERT.into("db.TaskCollections").entries({
        title: "My Tasks",
        isDefault: true,
      })
    );
  }

  return cds.run(queries);
}

module.exports = initDb;
