import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import Authenticator, { authenticatorData } from "../services/Authenticator";
import { InformationError } from "../error/InformationError";
import { HashManager } from "../services/HashManager";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new InformationError()
    }

    const userDatabase = new UserDatabase();
    const userDB = await userDatabase.getUserByEmail(email);

    if (!userDB) {
      throw new Error("Email não encontrado")
    }

    const hashManager = new HashManager();
    const hashPassword = await hashManager.compare(password, userDB.id);

    if (!hashPassword) {
      return res.status(401).send("Email ou senha incorreta");
    }

    const payload: authenticatorData = {
      id: userDB.id,
      role: userDB.role,
    };

    const authenticator = new Authenticator();
    const token = authenticator.generateToken(userDB);

    res.status(200).send({ message: "Usuário logado com sucesso", token });
  } catch (error: any) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
}
