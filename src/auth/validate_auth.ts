import jwt from "jsonwebtoken";
import JwtKey from "../helper/jwt_key";
import { Request, Response } from "express";
import { Code } from "../enum/code_enum";
import { Status } from "../enum/status_enum";
import { HttpResponse } from "../domain/response";

export const validate_auth = async (request: Request, response: Response): Promise<Response | void> => {
  let user_token: string | null = request.body.token;

  if (user_token) {
    jwt.verify(user_token, JwtKey, (error, decoded_token) => {
      if (error) {
        return response.status(Code.BAD_REQUEST)
          .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, "Not Authorized"))
      } else {
        return;
      }
    })
  } else {
    return response.status(Code.BAD_REQUEST)
        .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, "Not Authorized, not logged in"))
  }
}