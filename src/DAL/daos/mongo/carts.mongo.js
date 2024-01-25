import { cartsModel } from "../../models/carts.model.js";

class CartsManager {
  async createCart() {
    const newCart = { products: [] };
    const response = await cartsModel.create(newCart);
    return response;
  }

  async findCartById(idCart) {
    const response = await cartsModel
      .findById(idCart)
      .populate("products.product"); 
    return response;
  }

  async addProductToCart(idCart, idProduct) {
    const cart = await cartsModel.findById(idCart);

    const productIndex = cart.products.findIndex((p) =>
      p.product.equals(idProduct));
    if (productIndex === -1) {
      cart.products.push({ product: idProduct, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }
    return cart.save();
  }

  async deleteProductToCart(idCart, idProduct) {
    const cart = await cartsModel.findById(idCart);
    const productIndex = cart.products.findIndex((p) =>
      p.product.equals(idProduct));
    const productDeleted = cart.products[productIndex]
    if (productIndex !== -1) {
      cart.products.splice(productIndex, 1);
    } 
    await cart.save();
    return productDeleted
  }

  async updateProductsArray (idCart,prod) {
    const cart = await cartsModel.findById(idCart);
    cart.products = prod;
    await cart.save();
    return cart;
  }

  async updateProductQuantity(idCart, idProduct, quant) {
    const cart = await cartsModel.findById(idCart);
    const productIndex = cart.products.findIndex((p) =>
      p.product.equals(idProduct));
    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quant;
    } 
    await cart.save();
    return cart;
  }

  async deleteAllProducts(idCart) {
    const cart = await cartsModel.findById(idCart);
    cart.products = []
    await cart.save();
    return cart;
  }
}

export const CartManager = new CartsManager();