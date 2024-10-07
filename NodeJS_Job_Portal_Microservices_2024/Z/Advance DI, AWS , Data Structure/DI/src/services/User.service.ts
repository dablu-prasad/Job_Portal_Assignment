import { injectable } from "inversify";
import "reflect-metadata";
import UserRepository from "../repos/User.repository";

@injectable()
export default class UserService {
  //userRepository property is a dependency
  constructor(public readonly userRepository: UserRepository) {}

  async getUsers() {
    return await this.userRepository.findUsers();
  }

  async getSingleUser(id: string) {
    return await this.userRepository.findSingleUser(id);
  }

  async store(id: string, amountOfItemsInCart: number, total: number) {
    //Business logic
    if (amountOfItemsInCart >= 3) {
      const totalWithDiscount = total - (total * 20) / 100;
      return await this.userRepository.update(
        id,
        amountOfItemsInCart,
        totalWithDiscount
      );
    } else {
      return await this.userRepository.update(id, amountOfItemsInCart, total);
    }
  }
}
