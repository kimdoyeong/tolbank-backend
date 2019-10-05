class EmptyKeyError extends Error {
  constructor() {
    super("필수 항목이 없습니다.");
    this.status = 400;
    this.expose = true;
  }
}

module.exports = EmptyKeyError;
