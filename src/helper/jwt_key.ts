import dotenv from "dotenv";

dotenv.config();
export default function JwtKey() {

  let jwt_key: any;

  if (process.env.JWT_KEY) {
    jwt_key = process.env.JWT_KEY;
  } else {
    throw new Error;
  }

  return jwt_key;
}