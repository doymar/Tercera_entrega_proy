import { productsModel } from "../../models/products.model.js";

class ProductsManager {
    //Paginate
    async findAll(obj) {
      const {limit=10, page=1,order="def", ...query} = obj;
      
      let sort
      if (order== "asc"){
        sort = 'price'
      }else if (order== "desc"){
        sort = '-price'
      }else if(order == "def"){
        sort = {}
      }

      const options =  {
        page: page,
        limit: limit,
        sort
      }

      const response = await productsModel.paginate(query,options)
      
      const info = {
        status: response.docs ? "success" : "error",
        payload: response.docs,
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevLink: response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null,
        nextLink: response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null,
      }
      return {info};
  }

    async findById(id) {
        const result = await productsModel.findById(id);
        return result;
      }

    async createOne(obj) {
        const response = await productsModel.create(obj);
        return response;
    }

    async updateOne(id, obj) {
        const result = await productsModel.updateOne({ _id: id }, obj);
        return result;
      }
    
      async deleteOne(id) {
        const result = await productsModel.deleteOne({ _id: id });
        return result;
      }
}

export const ProductManager = new ProductsManager();