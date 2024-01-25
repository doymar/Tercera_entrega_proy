import { Router } from "express";
import { authMiddleware2 } from "../middlewares/auth.middleware.js";
import { ProductManager } from "../DAL/daos/mongo/products.mongo.js";
import { CartManager } from "../DAL/daos/mongo/carts.mongo.js";
import { randomProducts } from '../utils/faker.js';

const router = Router();

router.get("/", authMiddleware2('user'), (req,res)=>{
    res.render("chat");
});

router.get("/login",(req,res) => {
    if (req.user) {
        return res.redirect("/home")
    }
    res.render('login')
})

router.get("/signup2",(req,res) => {
    if (req.user) {
        return res.redirect("/home")
    }
    res.render('signup2')
})

router.get("/restaurar",(req,res) => {
    res.render('restaurar')
})

router.get("/realtimeproducts",(req,res)=>{
    res.render("realTimeProducts");
});

router.get('/product/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    console.log(idProduct);
    const response = await ProductManager.findById(idProduct);
    res.render('product',{product: response.toObject()});
})

router.get('/home', async (req,res) => {
    if (!req.user) {
        return res.redirect("/login")
    }
    const response = await ProductManager.findAll(req.query);
    const {info} = response
    const {payload} = info 
    const productsData = payload.map(doc => doc.toObject());
    const {first_name, email, role} = req.user;
    res.render("home",{products: productsData, user: {first_name, email, role}})
})

router.get('/signup',(req,res)=>{
    res.render("signup");
});

router.get('/profile/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    console.log(idProduct); 
    const response = await ProductManager.findById(idProduct);
    res.render('profile',{product: response.toObject()});
})

router.get('/products', async(req,res) => {
    res.render('products', {})
})

router.get('/carts/:cid', async (req,res) => {
    const {cid} = req.params;
    try {
        const cart = await CartManager.findCartById(cid);
        const cartProducts = cart.products.map(doc => doc.toObject());
        res.render('carts', {products: cartProducts})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/mockingproducts', async (req,res) => {
    try {
        const products = randomProducts();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default router;