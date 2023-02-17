import { CustomError } from "./CustomError";

export class EmailExist extends CustomError {
  constructor() {
    super("Email ja existe na aplicação", 401);
  }
}
