const cds = require("@sap/cds");
const { ColorSpecification } = require("../specification/color");

/**
 * Implementation of the Task application service
 */
class TaskService extends cds.ApplicationService {
  async init() {
    this.before("CREATE", "Collections", this.beforeCreateCollection);
    await super.init();
  }

  beforeCreateCollection(req) {
    const data = req.data;

    if (!this._isValidColor(data.color)) {
      req.reject(400, `Value '${data.color}' is not a valid color`);
      return;
    }

    data.color = data.color.toUpperCase();
    data.isDefault = data.isDefault || false;
  }

  _isValidColor(color) {
    return color ? new ColorSpecification().isValid(color) : true;
  }
}

module.exports = TaskService;
