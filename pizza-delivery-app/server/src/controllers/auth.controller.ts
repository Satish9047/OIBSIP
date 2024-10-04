import { Request, Response } from "express";

export const signUpHandler = async (req: Request, res: Response) => {
  res.send("This is sign up handler");
};

export const signInHandler = async (req: Request, res: Response) => {
  res.send("This is sign in handler");
};
