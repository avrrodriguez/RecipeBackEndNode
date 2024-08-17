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