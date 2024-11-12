export class UserNotAuthenticatedError extends Error {
  constructor() {
    super("User is not authenticated");
    this.name = "AuthenticationError";
  }
}

export class ManuscriptUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ManuscriptUploadError";
  }
}