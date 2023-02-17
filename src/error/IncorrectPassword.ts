import { CustomError } from "./CustomError";

export class InvalidCredencial extends CustomError {
  constructor() {
    super("A senha está incorreta", 401);
  }
}
