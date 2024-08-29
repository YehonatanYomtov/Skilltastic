import { Request, Response } from "express";
import { _signup } from "../models/userModel";

export async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;

  console.log("name: ", name);
  console.log("email: ", email);
  console.log("password: ", password);

  try {
    //! if (!req.body) -> then must have input with value

    console.log("req.body: ", req.body);
    const user = await _signup({ name, email, password });

    res.status(201).json(user);
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    res.status(500).json({ message: "Failed to Sign up." });
  }
}

// export async function login(req: Request, res: Response) {
//   const { email, password } = req.body;

//   try {
//     //! if (!req.body) -> then must have input with value
//     const userFromDb = await _findUserByEmail(email);

//     if (!userFromDb) await signup(email, password);

//     const user = await _login({...});

//     res.status(201).json(user);
//   } catch (error) {
//     const err = error as Error;
//     console.error(err.message);
//     res.status(500).json({ message: "Failed to log in." });
//   }
// }

// max@gmail.com
