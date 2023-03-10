import Recipes, { RecipesDB } from "../model/Recipes";
import { BaseDatabase } from "./BaseDatabase";
import { deleteRecipes } from "../endpoints/deleteRecipes"

export class RecipeDatabase extends BaseDatabase {
  public createRecipes = async (recipes: Recipes): Promise<void> => {
    const recipesDB: RecipesDB = {
      id: recipes.getId(),
      title: recipes.getTitle(),
      description: recipes.getDescription(),
      create_Date: recipes.getCreate_Date(),
      user_id: recipes.getUser_id(),
    };

    await this.getConnection().insert(recipesDB).into("recipes_cookenu");
  };

  public getRecipesById = async (
    id: string
  ): Promise<RecipesDB | undefined> => {
    const result: RecipesDB[] = await this.getConnection()
      .select("*")
      .where({ id })
      .from("recipes_cookenu");

    return result[0];
  };

  public async getAnotherProfile(id: string) {
    await this.getConnection()
    .select("*")
    .from("users_cookenu")
    .where({ id });
  }

  public async deleteRecipes(id: string) {
        await this.getConnection()
            .delete()
            .from("recipes_cookenu")
            .where({ id })
    }
}
