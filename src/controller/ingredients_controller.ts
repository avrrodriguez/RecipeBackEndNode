import { Request, Response } from "express";
import { Ingredient } from "../interface/ingredient";
import { QUERY } from "../query/ingredients_query";
import { FieldPacket, ResultSetHeader, RowDataPacket, OkPacket } from "mysql2";
import { HttpResponse } from "../domain/response";
import { Code } from "../enum/code_enum";
import { Status } from "../enum/status_enum";
import { connection } from "../database_config/mysql_config";

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getUserIngredients = async (request: Request, response: Response): Promise<Response<Ingredient[]>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method} ${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    let pool = await connection();
    let result: ResultSet = await pool.query(QUERY.SELECT_INGREDIENTS);

    return response.status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, "Ingredients request received", result[0]))
    
  } catch (error: unknown) {
    return response.status(Code.INTERNAL_SERVER_ERROR)
      .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"))
  }
}

export const getUserIngredient = async (request: Request, response: Response): Promise<Response<Ingredient>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_INGREDIENT, [request.params.ingredientId]);
    
    if ((result[0] as Array<ResultSet>).length > 0){
      return response.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Ingredient Received', result[0]));
    } else {
      return response.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Ingredient not found'));
    }

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};

export const createUserIngredient = async (request: Request, response: Response): Promise<Response<Ingredient>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  let ingredient: Ingredient = { ...request.body};

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.CREATE_INGREDIENT, Object.values(ingredient));
    ingredient = {id: (result[0] as ResultSetHeader).insertId, ...request.body };

    return response.status(Code.CREATED)
      .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Ingredient Created', result[0]));

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};

export const updateUserIngredient = async (request: Request, response: Response): Promise<Response<Ingredient>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  let ingredient: Ingredient = { ...request.body };

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_INGREDIENT, [request.params.ingredientId]);
    
    if ((result[0] as Array<ResultSet>).length > 0){
      const result: ResultSet = await pool.query(QUERY.UPDATE_INGREDIENT, [...Object.values(ingredient), request.params.ingredientId]);
      return response.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Ingredient updated', {...ingredient, id: request.params.ingredientId}));
    } else {
      return response.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Ingredient not found'));
    }

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};

export const deleteUserIngredient = async (request: Request, response: Response): Promise<Response<Ingredient>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.DELETE_INGREDIENT, [request.params.ingredientId]);
    
    if ((result[0] as Array<ResultSet>).length > 0){
      const result: ResultSet = await pool.query(QUERY.DELETE_INGREDIENT, request.params.ingredientId);

      return response.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Ingredient deleted'));
    } else {
      return response.status(Code.NOT_FOUND)
        .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'Ingredient not found'));
    }

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};
