import {
  createTask,
  deleteTask,
  getAllTasks,
} from "./controller/taskControlller";
import express from "express";

const routes = express.Router();

routes
  .get("/tasks", getAllTasks)
  .post("/tasks", createTask)
  .delete("tasks/:id", deleteTask);

export default routes;
