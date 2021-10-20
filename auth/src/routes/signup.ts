import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

router.post("/api/users/signup",
  [body('email')
    .isEmail()
    .withMessage("enter a valid email"),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("password must be 4 to 20 characters")
  ]
  , (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    throw new DatabaseConnectionError();
    const { email, passowrd } = req.body;
    console.log("Creating a user....");
    res.send({});
  });

export { router as signupRouter };