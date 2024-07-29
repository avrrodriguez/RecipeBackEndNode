import cors from "cors";
import express, { Application, Request, Response } from "express";
import { HttpResponse } from "./domain/response";
import { Code } from "./enum/code_enum";
import { Status } from "./enum/status_enum";
import recipesRoutes from "./routes/recipes_routes";

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = "This application is running on";
  private readonly ROUTE_NOT_FOUND = "Route does not exist on the server";

  constructor(private readonly port: number =  3000) {
    this.app = express();

    this.middleWare();
    this.routes();
  }

  listen(): void {
    this.app.listen(this.port);
    console.info(`${this.APPLICATION_RUNNING}: ${this.port}`);
  }
  
  middleWare(): void {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use("/recipes", recipesRoutes);
    this.app.get("/", (request: Request, response: Response) => response.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, "Request Received")));
    this.app.all("*", (request: Request, response: Response) => response.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
  }
}