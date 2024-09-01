import { Request, Response } from "express";
import { connection } from "../database_config/mysql_config";
import { Jwt } from "../interface/jwt";
import { User } from "../interface/user";
import { QUERY } from "../query/users_query";
import { Code } from "../enum/code_enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status_enum";
import { FieldPacket, ResultSetHeader, RowDataPacket, OkPacket } from "mysql2";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import JwtKey from "../helper/jwt_key";

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

let jwt_key = JwtKey();

export const signup = async (request: Request, response: Response): Promise<Response<Jwt>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    let pool = await connection();
    let queryResult: ResultSet = await pool.query(QUERY.SELECT_USER_NAME, [request.body.name]);

    if ((queryResult[0] as Array<ResultSet>).length > 0) {
      return response.status(Code.BAD_REQUEST)
        .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, "User already exists"))
    } else {

      let hashedPassword = await bcrypt.hash(request.body.password, 12);

      let createUser = await pool.query(QUERY.CREATE_USER, [request.body.name, hashedPassword]);

      let newUser: User = { id: (createUser[0] as ResultSetHeader).insertId, ...request.body };

      let token: String = jwt.sign({_id: newUser.id }, jwt_key, {
        expiresIn: '1d'
      });


      return response.status(Code.CREATED)
        .send(new HttpResponse(Code.CREATED, Status.CREATED, "User Created Successfully", token));
    }
    
  } catch (error) {
    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
}

export const login = async (request: Request, response: Response): Promise<Response<User>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    console.log(request.body);
    let { name, password } = request.body;
    
    let pool = await connection();
    let queryResult: ResultSet = await pool.query(QUERY.SELECT_USER_NAME, [name]);

    if (!queryResult) {
      return response.status(Code.BAD_REQUEST)
        .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, "User does not exist."))
    }

    let user: User = Object.values(queryResult[0])[0];

    let validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return response.status(Code.BAD_REQUEST)
        .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, "Not a user name or password do not match."))
    }

    let token: String = jwt.sign({_id: user.id }, jwt_key, {
      expiresIn: '1d'
    });

    return response.status(Code.OK)
        .send(
          new HttpResponse(
              Code.OK,
              Status.OK,
              "Logged in successfully",
              {
                token: token,
                user: {
                  id: user.id,
                  name: user.name
                }
              }
            )
        );

  } catch(error: unknown) {
    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
}