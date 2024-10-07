let user = {
  _id: "63966c89ff25c8fc03321ee9",
  amountOfItemsInCart: 4,
  total: 480,
};

let users = [
  {
    _id: "63966c89ff25c8fc03321ee9",
    amountOfItemsInCart: 4,
    total: 480,
  },
  {
    _id: "63967d37ff25c8fc03321eeb",
    amountOfItemsInCart: 5,
    total: 550,
  },
];

const mockUserRepo = {
  findUsers: async () => await users,
  findSingleUser: async (id: string) => await user,
  update: async (id: string, amountOfItemsInCart: number, total: number) =>
    await { _id: id, amountOfItemsInCart, total },
};

describe("user repository", () => {
  it("should have a method called findUsers", async () => {
    expect(mockUserRepo.findUsers).toBeDefined();
  });

  it("should have a method called findSingleUser", async () => {
    expect(mockUserRepo.findSingleUser).toBeDefined();
  });

  it("findUsers method should return users", async () => {
    expect(await mockUserRepo.findUsers()).toEqual(users);
  });

  it("findSingleUser method should return user", async () => {
    expect(
      await mockUserRepo.findSingleUser("63966c89ff25c8fc03321ee9")
    ).toEqual(user);
  });

  it("update method should return updated value", async () => {
    expect(
      await mockUserRepo.update("63966c89ff25c8fc03321ee9", 3, 400)
    ).toEqual({
      _id: "63966c89ff25c8fc03321ee9",
      amountOfItemsInCart: 3,
      total: 400,
    });
  });
});
