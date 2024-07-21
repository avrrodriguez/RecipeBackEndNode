import express, { Application } from "express";

export class App {
  private readonly app: Application;

  constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 3000) {
    this.app = express();
  }
}