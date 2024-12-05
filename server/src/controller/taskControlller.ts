import connection from "../db/connection";
import type { Request, Response, NextFunction } from "express";

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await connection("tasks");
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, column } = req.body;
    console.log(title, column);
    await connection("tasks").insert({ title, column });

    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id);
    await connection("tasks").where("id", id).delete();
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, column } = req.body;
    console.log(id, title, column);
    await connection("tasks").where("id", id).update({ title, column });
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
