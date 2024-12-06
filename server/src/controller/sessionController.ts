import connection from "../db/connection";
import type { Request, Response, NextFunction } from "express";

export const create = async (req: Request, res: Response) => {
  const { login } = req.body;

  const user = await connection("users")
    .where("login", login)
    .select("*")
    .first();

  if (!user) {
    return res.status(401).json({ message: "Login inválido" });
  }

  return res.status(200).json(user);
};
