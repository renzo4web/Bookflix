import jwt from "jsonwebtoken";
import config from "../config";

export interface IGenerateToken {
  id: string;
  name: string;
}

export const generateToken = ({ id, name }: IGenerateToken): string => {
  const token = jwt.sign(
    {
      id,
      name,
    },
    config.jwtSecret,
    {
      expiresIn: "24h",
    }
  );

  return token;
};
