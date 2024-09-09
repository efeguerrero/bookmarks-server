export class AuthError extends Error {
  constructor(message, status = 401) {
    super(message);
    this.statusCode = status;
  }
}

export class NotFoundError extends Error {
  constructor(message, status = 404) {
    super(message);
    this.statusCode = status;
  }
}

export class BadRequestError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.statusCode = status;
  }
}
