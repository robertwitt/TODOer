export default abstract class CodeList<Code, Name> {
  private _code!: Code;
  private _name?: Name;

  constructor(code: Code, name?: Name) {
    this.code = code;
    this.name = name;
  }

  get code(): Code {
    return this._code;
  }

  set code(value: Code) {
    this._code = value;
  }

  get name(): Name | undefined {
    return this._name;
  }

  set name(value: Name | undefined) {
    this._name = value;
  }
}
