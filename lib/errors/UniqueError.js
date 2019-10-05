class UniqueError extends Error {
  constructor(entity) {
    super(entity ? `이미 있는 ${entity}입니다.` : "이미 있는 항목입니다.");
    this.expose = true;
    this.status = 422;
  }
}

module.exports = UniqueError;
