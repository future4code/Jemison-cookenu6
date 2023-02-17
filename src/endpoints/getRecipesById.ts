import { Request, Response } from "express";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { InvalidCredencial } from "../error/IncorrectPassword";
import { InvalidError } from "../error/InvalidError";
import { InformationError } from "../error/InformationError";
import Authenticator from "../services/Authenticator";

export async function getRecipesById(req: Request, res: Response) {
  try {
    const token = req.headers.authorization as string;
    const id = req.params.id 

    if (!id) {
      throw new InvalidError("Falta passar o Id");
    }

    if (!token) {
      throw new InformationError();
    }

    const authenticator = new Authenticator();

    const AuthenticationData = authenticator.verifyToken(token);

    if (!AuthenticationData) {
      throw new InvalidCredencial();
    }

    const recipesData = new RecipeDatabase();

    const recipe = await recipesData.getRecipesById(id);

    if (!recipe) {
      throw new InvalidError("Receita não encontrada");
    }

    res.status(201).send(recipe)
  } catch (error: any) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
}
