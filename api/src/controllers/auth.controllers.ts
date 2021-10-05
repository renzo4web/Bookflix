import { Request, RequestHandler, Response } from "express";
import { generateToken, IGenerateToken } from "../helpers/generateToken";
import User, { IUser } from "../models/User";

export const signUp: RequestHandler = async (req, res): Promise<Response> => {
  try {
    const user = req.body as IUser;

    const existUser = await User.findOne({ email: user.email });

    if (existUser) {
      res.status(400).json({
        ok: false,
        msg: "Email already registered in database",
      });
    }

    const newUser = new User(user);

    await newUser.save();

    const token = generateToken({
      id: newUser.id,
      name: newUser.name,
    });

    return res.json({
      ok: true,
      name: newUser.name,
      uid: newUser.id,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      user: "database fail",
    });
  }
};

export interface ISignIn extends Request {
  email: string;
  password: string;
}

export const signIn: RequestHandler = async (
  { body }: { body: ISignIn },
  res
): Promise<Response> => {
  try {
    const existUser = (await User.findOne({
      email: body.email,
    })) as IUser;

    if (!existUser) {
      res.status(400).json({
        ok: false,
        msg: "User do not exist in database",
      });
    }

    const isMatch = await existUser.comparePassword(body.password);

    if (!isMatch) {
      res.status(400).json({
        ok: false,
        msg: "Email or Password Invalid",
      });
    }

    const token = generateToken({
      id: existUser.id,
      name: existUser.name,
    });

    return res.json({
      ok: true,
      user: existUser.email,
      uid: existUser.id,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      user: "database fail",
    });
  }
};

export const renewToken: RequestHandler = (req, res) => {
  try {
    const { id, name } = req.user as { id: string; name: string };

    const token = generateToken({ id, name });

    return res.json({
      ok: true,
      uid: id,
      name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      user: "database fail",
    });
  }
};
