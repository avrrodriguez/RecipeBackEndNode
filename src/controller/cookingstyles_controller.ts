import { Request, Response } from "express";
import { Cookingstyle } from "../interface/cooking_style";
import { QUERY } from "../query/cooking_styles_query";
import { FieldPacket, ResultSetHeader, RowDataPacket, OkPacket } from "mysql2";
import { HttpResponse } from "../domain/response";
import { Code } from "../enum/code_enum";
import { Status } from "../enum/status_enum";
import { connection } from "../database_config/mysql_config";

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getUserCookingStyles = async (request: Request, response: Response): Promise<Response<Cookingstyle[]>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method} ${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    let pool = await connection();
    let result: ResultSet = await pool.query(QUERY.SELECT_COOKING_STYLES);

    return response.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, "Cooking Style request received", result[0]))
    
  } catch (error: unknown) {
    return response.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"))
  }
}


export const getUserCookingStyle = async (request: Request, response: Response): Promise<Response<Cookingstyle>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_COOKING_STYLE, [request.params.cookingstyleId]);
    
    if ((result[0] as Array<ResultSet>).length > 0){
      return response.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Cooking Style Received', result[0]));
    } else {
      return response.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Cooking Style not found'));
    }

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};

export const createUserCookingStyle = async (request: Request, response: Response): Promise<Response<Cookingstyle>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  let cooking_style: Cookingstyle = { ...request.body};

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.CREATE_COOKING_STYLE, Object.values(cooking_style));
    cooking_style = {id: (result[0] as ResultSetHeader).insertId, ...request.body };

    return response.status(Code.CREATED)
      .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Cooking Style Created', result[0]));

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};

export const updateUserCookingStyle = async (request: Request, response: Response): Promise<Response<Cookingstyle>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  let cooking_style: Cookingstyle = { ...request.body };

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_COOKING_STYLE, [request.params.cookingstyleId]);
    
    if ((result[0] as Array<ResultSet>).length > 0){
      const result: ResultSet = await pool.query(QUERY.UPDATE_COOKING_STYLE, [...Object.values(cooking_style), request.params.cookingstyleId]);

      return response.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Cooking Style updated', {...cooking_style, id: request.params.cookingstyleId}));
    } else {
      return response.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Cooking Style not found'));
    }

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};

export const deleteUserCookingStyle = async (request: Request, response: Response): Promise<Response<Cookingstyle>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.DELETE_COOKING_STYLE, [request.params.cookingstyleId]);
    
    if ((result[0] as Array<ResultSet>).length > 0){
      const result: ResultSet = await pool.query(QUERY.DELETE_COOKING_STYLE, request.params.cookingstyleId);

      return response.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Cooking Style deleted'));
    } else {
      return response.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Cooking Style not found'));
    }

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};
