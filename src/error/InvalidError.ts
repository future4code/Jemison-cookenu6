import { CustomError } from "./CustomError";

export class InvalidError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}
