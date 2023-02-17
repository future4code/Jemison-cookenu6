import { CustomError } from "./CustomError";

export class InformationError extends CustomError {
  constructor() {
    super("Valores devem ser passados", 404);
  }
}
