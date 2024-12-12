// import UserService from "./User.service";
// import assert from "assert";
// import { mock } from "jest-mock-extended";

// const mockedTodoService = mock<UserService>();

// describe("Users service", () => {
//   let user = {
//     _id: "63966c89ff25c8fc03321ee9",
//     amountOfItemsInCart: 4,
//     total: 480,
//   };

//   let users = [
//     {
//       _id: "63966c89ff25c8fc03321ee9",
//       amountOfItemsInCart: 4,
//       total: 480,
//     },
//     {
//       _id: "63967d37ff25c8fc03321eeb",
//       amountOfItemsInCart: 5,
//       total: 550,
//     },
//   ];

//   const mockUserRepo = {
//     findUsers: jest.fn().mockImplementation(async () => await users),
//     findSingleUser: jest.fn().mockImplementation(async (id) => await user),
//     update: jest
//       .fn()
//       .mockImplementation(
//         async (id, amountOfItemsInCart, total) =>
//           await { _id: id, amountOfItemsInCart, total }
//       ),
//   };
//   const userService = new UserService(mockUserRepo);
//   it("getUsers method is called and returns all users", async () => {
//     //mockResolvedValue accepts a value that will be returned whenever the mock function is called
//     mockedTodoService.getUsers.mockResolvedValue(users);
//     //assert.deepEqual tests if 2 objects are equal
//     assert.deepEqual(await userService.getUsers(), users);

//     //jest.spyOn is used to track calls on a method
//     const spy = jest.spyOn(userService, "getUsers");
//     await userService.getUsers();
//     expect(spy).toHaveBeenCalled();

//     jest
//       .spyOn(userService, "getUsers")
//       .mockImplementation(async () => await mockUserRepo.findUsers());

//     jest.spyOn(userService, "getUsers").mockReturnValue(Promise.resolve(users));
//   });
//   it("getSingleUser is called and returns a single user", async () => {
//     mockedTodoService.getSingleUser.mockResolvedValue(user);
//     assert.deepEqual(
//       await userService.getSingleUser("63966c89ff25c8fc03321ee9"),
//       user
//     );
//     const spy = jest.spyOn(userService, "getSingleUser");
//     await userService.getSingleUser("63966c89ff25c8fc03321ee9");
//     expect(spy).toHaveBeenCalled();
//   });

//   it("calculate new total of items >=3", async () => {
//     assert.deepEqual(
//       await userService.store("63966c89ff25c8fc03321ee9", 3, 400),
//       {
//         _id: "63966c89ff25c8fc03321ee9",
//         amountOfItemsInCart: 3,
//         total: 320,
//       }
//     );
//     const spy = jest.spyOn(userService, "store");
//     await userService.store("63966c89ff25c8fc03321ee9", 3, 300);
//     expect(spy).toHaveBeenCalled();
//   });
// });
