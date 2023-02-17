import { CustomError } from "./CustomError";

export class InsufficientAuthorization extends CustomError {
  constructor() {
    super("Autorização insuficiente", 401);
  }
}
