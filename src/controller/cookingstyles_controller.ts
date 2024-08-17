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