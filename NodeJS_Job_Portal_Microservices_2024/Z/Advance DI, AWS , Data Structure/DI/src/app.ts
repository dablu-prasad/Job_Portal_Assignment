import "reflect-metadata"; //allows the decorator to work
import express from "express";
import "./controllers/User.controller";
//This is the dependency injection container that will allow us to retrieve and resolve some instances from the Dependency injection container
import { Container } from "inversify";
import UserRepository from "./repos/User.repository";
import UserService from "./services/User.service";
import { InversifyExpressServer } from "inversify-express-utils";

const app = express();
app.use(express.json());

const container = new Container();
container.bind(UserRepository).toSelf();
container.bind(UserService).toSelf();

//http://localhost:8000/api/users/
let server = new InversifyExpressServer(
  container,
  null,
  { rootPath: "/api" },
  app
);

let appConfigured = server.build();

//You need to avoid calling app when appConfigured listens when you run tests.So we don't listen in this file
export { app, appConfigured };
