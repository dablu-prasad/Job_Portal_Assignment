"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const database_1 = __importDefault(require("./database"));
(0, database_1.default)(); // connects to DB
app_1.appConfigured.listen(8000, () => console.log("Listening port 8000"));
