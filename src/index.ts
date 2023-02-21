import app from "./app";
import { signup } from "./endpoints/signup";
import { login } from "./endpoints/login";
import { userProfile } from "./endpoints/userProfile";
import { getAnotherProfile } from "./endpoints/getAnotherProfile";
import { deleteRecipes } from "./endpoints/deleteRecipes"
import { deleteUser } from "./endpoints/deleteUser"
import { createRecipes } from "./endpoints/createRecipes";
import { getRecipesById } from "./endpoints/getRecipesById";

app.post("/user/signup", signup);
app.get("/user/login", login) //olhar get ou post
app.post("/recipes/create", createRecipes);

app.get("/user/profile", userProfile);
app.get("/user/:id", getAnotherProfile);
app.get("/recipes/:id", getRecipesById);

app.delete("/user/delete/:id", deleteUser)
app.delete("/recipes/delete/:id", deleteRecipes)


