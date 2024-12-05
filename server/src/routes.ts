import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "./controller/taskControlller";
import express from "express";

const routes = express.Router();

routes
  .get("/tasks", getAllTasks)
  .post("/tasks", createTask)
  .put("/tasks/:id", updateTask)
  .delete("/tasks/:id", deleteTask);

export default routes;
