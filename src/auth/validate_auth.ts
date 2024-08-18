import jwt from "jsonwebtoken";
import JwtKey from "../helper/jwt_key";
import { Request, Response } from "express";
import { Code } from "../enum/code_enum";
import { Status } from "../enum/status_enum";
import { HttpResponse } from "../domain/response";

export const validate_auth = async (request: Request, response: Response): Promise<Response | void> => {
  let jwt_token = request.headers.authorization?.split(" ")[1];
  let user_token: string | undefined = jwt_token;

  if (user_token) {
    jwt.verify(user_token, JwtKey(), (error, decoded_token) => {
      if (error) {
        return response.status(Code.BAD_REQUEST)
          .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, "Not Authorized"))
      } else {
        console.log("user token verified");
        return;
      }
    })
  } else {
    return response.status(Code.BAD_REQUEST)
        .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, "Not Authorized, not logged in"))
  }
}