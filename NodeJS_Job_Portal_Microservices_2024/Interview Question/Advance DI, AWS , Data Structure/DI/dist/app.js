"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfigured = exports.app = void 0;
require("reflect-metadata"); //allows the decorator to work
const express_1 = __importDefault(require("express"));
require("./controllers/User.controller");
//This is the dependency injection container that will allow us to retrieve and resolve some instances from the Dependency injection container
const inversify_1 = require("inversify");
const User_repository_1 = __importDefault(require("./repos/User.repository"));
const User_service_1 = __importDefault(require("./services/User.service"));
const inversify_express_utils_1 = require("inversify-express-utils");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
const container = new inversify_1.Container();
container.bind(User_repository_1.default).toSelf();
container.bind(User_service_1.default).toSelf();
//http://localhost:8000/api/users/
let server = new inversify_express_utils_1.InversifyExpressServer(container, null, { rootPath: "/api" }, app);
let appConfigured = server.build();
exports.appConfigured = appConfigured;
