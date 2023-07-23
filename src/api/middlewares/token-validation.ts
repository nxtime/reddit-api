import { NextFunction, Request, Response } from "express";

const tokenValidation = (_req: Request, res: Response, next: NextFunction) => {
  try {
    // const authHeader = req.headers.authorization;

    // if (!authHeader) throw new Error("Dont have headers authorization");

    // const [, bearerToken] = authHeader.split(" ");

    // if (!bearerToken) throw new Error("Dont have token");

    return next();
  } catch (error: any) {

    res.status(401).send({ message: error.message });

  }

};

export default tokenValidation;