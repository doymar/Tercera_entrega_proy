import { Router } from "express";
import { authMiddleware, authMiddleware2 } from "../middlewares/auth.middleware.js";
import { findAllProducts, findProductById, createProduct, deleteProduct, updateProduct, addProduct } from '../controllers/products.controller.js'

const router = Router();

router.get('/', findAllProducts);

router.get('/:pid', findProductById);

router.post("/", authMiddleware, authMiddleware2('admin'), createProduct);

router.delete("/:idProduct", authMiddleware2('admin'), deleteProduct);

router.put("/:pid", authMiddleware2('admin'), updateProduct);

router.post("/signup", authMiddleware, authMiddleware2('admin'), addProduct)

export default router