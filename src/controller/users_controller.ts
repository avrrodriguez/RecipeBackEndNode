import { Request, Response } from "express";
import { connection } from "../database_config/mysql_config";
import { User } from "../interface/user";
import { QUERY } from "../query/users_query";
import { Code } from "../enum/code_enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status_enum";
import { FieldPacket, ResultSetHeader, RowDataPacket, OkPacket } from "mysql2";

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getUsers = async (request: Request, response: Response): Promise<Response<User[]>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_USERS);
    
    return response.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Recipe Received', result[0]));

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};

export const getUser = async (request: Request, response: Response): Promise<Response<User>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_USER, [request.params.userId]);
    
    if ((result[0] as Array<ResultSet>).length > 0){
      return response.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Recipe Received', result[0]));
    } else {
      return response.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Recipe not found'));
    }

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};

export const createUser = async (request: Request, response: Response): Promise<Response<User>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  let user: User = { ...request.body};

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.CREATE_USER, Object.values(user));
    user = {id: (result[0] as ResultSetHeader).insertId, ...request.body };

    return response.status(Code.CREATED)
      .send(new HttpResponse(Code.CREATED, Status.CREATED, 'User Received', result[0]));

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};