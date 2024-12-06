import connection from "../db/connection";
import type { Request, Response, NextFunction } from "express";
import { generateId } from "../utils/generateId";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { project_id } = req.params;
    const tasks = await connection("tasks")
      .where("project_id", project_id)
      .select("*");
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, column, project_id } = req.body;
    const id = generateId();
    await connection("tasks").insert({ title, column, project_id, id });

    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const down = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await connection("tasks").where("id", id).delete();
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, column } = req.body;
    await connection("tasks").where("id", id).update({ title, column });
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
