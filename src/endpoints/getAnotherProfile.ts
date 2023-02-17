import { Request, Response } from "express";
import { InvalidError } from "../error/InvalidError";
import { UserDatabase } from "../data/UserDatabase";
import Authenticator from "../services/Authenticator";

export async function getAnotherProfile(req: Request, res: Response) {
  try {
    const token = req.headers.authorization as string;

    if (!token) {
      throw new InvalidError("Token não encontrado");
    }

    const userData = new UserDatabase();

    const authenticator = new Authenticator();
    const payload = authenticator.verifyToken(token);

    const searchPerson = await userData.getUserById(payload.id);

    if (!searchPerson) {
      throw new Error("Usuário não encontrado");
    }

    res.status(200).send(searchPerson);
  } catch (error: any) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
}
