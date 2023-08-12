import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserController, TodoListControler } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { loginValidation, registerValidation } from "./validations.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin:admin@todo-list.orwrbg5.mongodb.net/Todo?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Ok"))
  .catch((err) => console.log("DB error", err));

//? Auth
app.post(
  "/api/v1/users/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/api/v1/users/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/api/v1/users/me", checkAuth, UserController.getMe);

//? Todo-list
app.post("/api/v1/todo/add", TodoListControler.createTodo);
app.get("/api/v1/todo", TodoListControler.getTodo);
app.patch("/api/v1/todo/update/:id", TodoListControler.updateTodo);
app.delete("/api/v1/todo/delete/:id", TodoListControler.deleteTodo);
app.patch("/api/v1/todo/completed/:id",TodoListControler.completedTodo);

const PORT = 7778;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
