const cds = require("@sap/cds");
const { ColorSpecification } = require("../specification/color");

/**
 * Implementation of the Task application service
 */
class TaskService extends cds.ApplicationService {
  async init() {
    this.before(
      ["CREATE", "UPDATE"],
      "Collections",
      this.validateCollectionColor
    );
    this.before("CREATE", "Collections", this.setCollectionDefaults);
    this.on(["CREATE", "UPDATE"], "Collections", this.changeDefaultCollection);
    await super.init();
  }

  validateCollectionColor(req) {
    if (!req.data) return;

    const color = req.data.color;
    if (!color) return;

    if (!new ColorSpecification().isValid(color)) {
      req.reject(400, `Value '${color}' is not a valid color`);
      return;
    }
    req.data.color = color.toUpperCase();
  }

  setCollectionDefaults(req) {
    if (!req.data) return;
    const data = req.data;
    data.isDefault = data.isDefault || false;
  }

  async changeDefaultCollection(req, next) {
    const collection = await next(req);

    if (req.data && req.data.isDefault && collection.isDefault) {
      await this.tx(req).run(
        UPDATE`Collections`.set`isDefault = false`.where`ID != ${collection.ID}`
      );
    }

    return collection;
  }
}

module.exports = TaskService;
