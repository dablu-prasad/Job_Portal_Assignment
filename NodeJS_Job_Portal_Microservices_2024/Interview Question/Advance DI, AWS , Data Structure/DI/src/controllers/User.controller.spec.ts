// import { Request, Response } from "express";
// import UserController from "./User.controller";
// import UserService from "../services/User.service";

// let user = {
//   _id: "63966c89ff25c8fc03321ee9",
//   amountOfItemsInCart: 4,
//   total: 480,
// };

// let users = [
//   {
//     _id: "63966c89ff25c8fc03321ee9",
//     amountOfItemsInCart: 4,
//     total: 480,
//   },
//   {
//     _id: "63967d37ff25c8fc03321eeb",
//     amountOfItemsInCart: 5,
//     total: 550,
//   },
// ];

// const mockUserRepo = {
//   findUsers: jest.fn().mockResolvedValue(users),
//   findSingleUser: jest.fn().mockReturnValue(user),
//   update: jest
//     .fn()
//     .mockImplementation(
//       async (id, amountOfItemsInCart, total) =>
//         await { _id: id, amountOfItemsInCart, total }
//     ),
// };

// const userService = new UserService(mockUserRepo);
// const userController = new UserController(userService);

// describe("Controller test", () => {
//   it("should have access to the user service", () => {
//     expect(userController.userService).toBeDefined();
//   });

//   it("should return all users", async () => {
//     const response: Partial<Response> = {
//       send: jest.fn().mockResolvedValue(users),
//       statusCode: 200,
//     };
//     await userController.getUsers({} as Request, response as Response);
//     expect(response.send).toHaveBeenCalledWith(users);
//     expect(response.statusCode).toBe(200);
//   });

//   it("Should return a single user", async () => {
//     const response: Partial<Response> = {
//       send: jest.fn().mockResolvedValue(user),
//       statusCode: 200,
//     };

//     const request: Partial<Request> = {
//       params: {
//         id: "63966c89ff25c8fc03321ee9",
//       },
//     };
//     await userController.getSingleUser(
//       request as Request,
//       response as Response
//     );
//     expect(request.params).toEqual({
//       id: "63966c89ff25c8fc03321ee9",
//     });

//     expect(response.send).toHaveBeenCalledWith(user);
//   });

//   it("should return updated cart", async () => {
//     const jsonData = {
//       id: "63966c89ff25c8fc03321ee9",
//       amountOfItemsInCart: 3,
//       total: 300,
//     };
//     const response: Partial<Response> = {
//       json: jest.fn(),
//       statusCode: 200,
//     };

//     const request: Partial<Request> = {
//       body: jsonData,
//     };
//     await userController.store(request as Request, response as Response);
//     expect(request.body).toEqual(jsonData);
//     expect(response.json).toHaveBeenCalledWith({
//       _id: jsonData.id,
//       amountOfItemsInCart: jsonData.amountOfItemsInCart,
//       total: 240,
//     });
//     expect(response.statusCode).toBe(200);
//   });
// });
