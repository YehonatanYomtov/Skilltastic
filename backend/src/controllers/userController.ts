import { Request, Response } from "express";
import { _signup } from "../models/userModel";

export async function signup(req: Request, res: Response) {
  try {
    // if (!req.body)
    const user = await _signup(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all courses" });
  }
}
