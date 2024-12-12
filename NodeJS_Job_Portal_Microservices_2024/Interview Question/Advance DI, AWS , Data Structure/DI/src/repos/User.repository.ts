import { injectable } from "inversify";
import "reflect-metadata";
import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";
//CRUD operations

@injectable()
export default class UserRepository {
  async findUsers() {
    return (await User.find({})) as Array<IUser>;
  }
  async findSingleUser(id: string) {
    const user = (await User.findById(id)) as IUser;
    return user;
  }

  async update(id: string, amountOfItemsInCart: number, total: number) {
    try {
      return await User.findOneAndUpdate(
        { _id: id },
        { amountOfItemsInCart: amountOfItemsInCart, total },
        { new: true }
      );
    } catch (err) {
      return {};
    }
  }
}
