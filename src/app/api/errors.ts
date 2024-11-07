export class UserNotAuthenticatedError extends Error {
  constructor() {
    super("User is not authenticated");
    this.name = "AuthenticationError";
  }
}