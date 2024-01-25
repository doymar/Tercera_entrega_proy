import { ProductManager } from "../DAL/daos/mongo/products.mongo.js";

class ProductsService {
    async findAll(obj) {
        const products = await ProductManager.findAll(obj);
        return products;
    } 

    async findById(id) {
        const product = await ProductManager.findById(id);
        return product;
    }
    
    async createOne(obj) {
        const product = await ProductManager.createOne(obj);
        return product;
    }

    async deleteOne(id) {
        const product = await ProductManager.deleteOne(id);
        return product;
    }

    async updateOne(id, obj) {
        const product = await ProductManager.updateOne(id, obj);
        return product;
    }
}

export const productsService = new ProductsService();