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

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const signup = async (request: Request, response: Response): Promise<Response<Jwt>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    const pool = await connection();
    const queryResult: ResultSet = await pool.query(QUERY.SELECT_USER_NAME, [request.body.name]);

    if ((queryResult[0] as Array<ResultSet>).length > 0) {
      return response.status(Code.BAD_REQUEST)
        .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, "User already exists"))
    } else {

      let hashedPassword = await bcrypt.hash(request.body.password, 12);
      let createUser = await pool.query(QUERY.CREATE_USER, Object.values({...request.body, hashedPassword}));


      let newUser: User = { id: (createUser[0] as ResultSetHeader).insertId, ...request.body };

      let token: String = jwt.sign({_id: newUser.id }, "secretKey123", {
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

//export const login = async (request: Request, response: Response): Promise<Response<User>> => {}