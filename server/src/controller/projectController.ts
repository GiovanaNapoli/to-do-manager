import connection from "../db/connection";
import type { Request, Response, NextFunction } from "express";
import { generateId } from "../utils/generateId";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.headers.authorization;

  try {
    const projects = await connection("projects")
      .where("user_id", user_id)
      .select("name", "id");
    return res.status(200).json(projects);
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
    const { name } = req.body;
    const id = generateId();
    const user_id = req.headers.authorization;

    await connection("projects").insert({ name, user_id, id });

    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};
