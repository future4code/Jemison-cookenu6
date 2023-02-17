import app from "./app";
import { signup } from "./endpoints/signup";
import { login } from "./endpoints/login";
import { userProfile } from "./endpoints/userProfile";
import { getAnotherProfile } from "./endpoints/getAnotherProfile";
import { createRecipes } from "./endpoints/createRecipes";
import { getRecipesById } from "./endpoints/getRecipesById";

app.post("/user/signup", signup);
app.post("/user/login", login);
app.get("/user/profile", userProfile);
app.get("/user/:id", getAnotherProfile);

app.post("/recipes/create", createRecipes);
app.get("/recipes/:id", getRecipesById);
