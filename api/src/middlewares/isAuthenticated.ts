import type { NextFunction, Request, Response } from "express";
import { supabase } from '../services/supabase';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(403).send("A token is required for authentication");
    return;
  }

  try {
    const response = await supabase.auth.getUser(token);

    if (!response.data?.user) {
      throw new Error("Invalid token");
    }

    req.user  = {
      id: response.data.user.id,
      isAuthenticated: true,
    }

    return next();
  } catch (err) {
    res.status(401).send({ message: "Not Authorized", error: err});
    return;
  }
}
