import { Request, Response } from "express";
import { InformationError } from "../error/InformationError";
import { CustomError } from "../error/CustomError";
import { InsufficientAuthorization } from "../error/InsuficienceAuthorization";;
import { RecipeDatabase } from "../data/RecipeDatabase";
import { USER_ROLES } from "../model/User";
import Authenticator from "../services/Authenticator";

export async function deleteRecipes(req: Request, res: Response){
    try{
        const token = req.headers.authorization 
        const id = req.params.id 
        if (!token) {
            throw new InformationError();
          }
          const idPerson = new Authenticator().verifyToken(token)
          const recipeData = new RecipeDatabase()
          const recipeById = await recipeData.getRecipesById(id)

          if (!recipeById) {
            throw new Error("Receita não encontrada");
        }
        const response = await recipeData.deleteRecipes(id)

        res.status(200).send("Receita deletada")

    }catch(error: any){
        res.status(error.statusCode || 500).send({ message: error.message });
    }
}


