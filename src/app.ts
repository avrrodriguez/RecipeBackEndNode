import cors from "cors";
import express, { Application } from "express";

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = "This application is running on";
  private readonly ROUTE_NOT_FOUND = "Route does not exist on the server";

  constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 3000) {
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
    this.app.use("/recipes", (request, response) => {});
    this.app.get("/", (request, response) => response.status(200).send({ message: "Server is up."}));
    this.app.get("*", (request, response) => response.status(404).send({ message: this.ROUTE_NOT_FOUND}));
  }
}