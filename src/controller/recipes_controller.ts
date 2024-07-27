import { Request, Response } from "express";
import { connection } from "../database_config/mysql_config";
import { Recipe } from "../interface/recipe";
import { QUERY } from "../query/recipes_query";
import { Code } from "../enum/code_enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status_enum";
import { FieldPacket, ResultSetHeader, RowDataPacket, OkPacket } from "mysql2";

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getPatients = async (request: Request, response: Response): Promise<Response<Recipe[]>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENTS);
    
    return response.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Recipe Received', result[0]));

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};

export const getPatient = async (request: Request, response: Response): Promise<Response<Recipe>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [request.params.recipeId]);
    
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

export const createPatient = async (request: Request, response: Response): Promise<Response<Recipe>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  let recipe: Recipe = { ...request.body};

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.CREATE_PATIENTS, Object.values(recipe));
    recipe = {id: (result[0] as ResultSetHeader).insertId, ...request.body };

    return response.status(Code.CREATED)
      .send(new HttpResponse(Code.CREATED, Status.CREATED, 'Recipe Received', result[0]));

  } catch (error: unknown) {
    console.error(error);

    return response.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "An error occurred"));
  }
};

export const updatePatient = async (request: Request, response: Response): Promise<Response<Recipe>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  let recipe: Recipe = { ...request.body };

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [request.params.recipeId]);
    
    if ((result[0] as Array<ResultSet>).length > 0){
      const result: ResultSet = await pool.query(QUERY.UPDATE_PATIENTS, [...Object.values(recipe), request.params.recipeId]);
      return response.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Recipe updated', {...recipe, id: request.params.recipeId}));
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

export const deletePatient = async (request: Request, response: Response): Promise<Response<Recipe>> => {
  console.info(`[${new Date().toLocaleString()}] Incoming ${request.method}${request.originalUrl} Request from ${request.rawHeaders[0]} ${request.rawHeaders[1]}`);

  try {
    const pool = await connection();
    const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [request.params.recipeId]);
    
    if ((result[0] as Array<ResultSet>).length > 0){
      const result: ResultSet = await pool.query(QUERY.DELETE_PATIENTS, request.params.recipeId);
      return response.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Recipe deleted'));
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