import { UserManager } from "../DAL/daos/mongo/users.mongo.js";
import { CartManager } from "../DAL/daos/mongo/carts.mongo.js";
import UsersRequestDto from "../DAL/dtos/user-request.dto.js";
import UsersResponseDto from "../DAL/dtos/user-response.dto.js";
import { hashData } from "../utils/utils.js";

class UsersService {
    async findAll() {
        const users = await UserManager.findAll();
        return users;
    }

    async findById(id) {
        const user = await UserManager.findById(id);
        const userDTO = new UsersResponseDto(user);
        return userDTO;
    }

    async createOne(obj) {
        const hashedPassword = await hashData(obj.password);
        const newCart = await CartManager.createCart();
        //const cart = newCart._id
        const newObj = {...obj, password: hashedPassword, cart: newCart._id}
        const userDTO = new UsersRequestDto(newObj)
        const createdUser = await UserManager.createOne(userDTO);
        return createdUser;
    }

    async findByEmail(email) {
        const user = await UserManager.findByEmail(email);
        const userDTO = new UsersResponseDto(user);
        return userDTO;
    }

    async deleteOne(id) {
        const user = await UserManager.deleteOne(id);
        return user;
    }
}

export const usersService = new UsersService();