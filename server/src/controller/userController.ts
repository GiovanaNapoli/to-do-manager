import connection from "../db/connection";
import type { Request, Response, NextFunction } from "express";
import { generateId } from "../utils/generateId";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, login } = req.body;
    const id = generateId();
    await connection("users").insert({ name, login, id });

    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};
