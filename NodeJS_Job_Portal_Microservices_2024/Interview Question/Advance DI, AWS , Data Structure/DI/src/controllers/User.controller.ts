// import "reflect-metadata";
// import { Request, Response } from "express";
// import UserService from "../services/User.service";
// import {
//   controller,
//   httpGet,
//   httpPost,
//   interfaces,
// } from "inversify-express-utils";

// @controller("/users")
// export default class UserController implements interfaces.Controller {
//   constructor(public readonly userService: UserService) {}

//   @httpGet("/")
//   async getUsers(req: Request, res: Response) {
//     res.send(await this.userService.getUsers());
//   }

//   @httpGet("/:id")
//   async getSingleUser(req: Request, res: Response) {
//     res.send(await this.userService.getSingleUser(req.params.id));
//   }

//   @httpPost("/shop")
//   async store(req: Request, res: Response) {
//     const { id, amountOfItemsInCart, total } = req.body;
//     res.json(await this.userService.store(id, +amountOfItemsInCart, +total));
//   }
// }
