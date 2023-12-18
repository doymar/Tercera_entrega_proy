import express from 'express';
import cookieParser from 'cookie-parser';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import cookieRouter from './routes/cookie.router.js';
import sessionsRouter from "./routes/sessions.router.js";
import session from "express-session";
import { MessageManager } from './managers/MessagesManager.js';
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import MongoStore from 'connect-mongo';
import './db/configDB.js';
import './passport.js';
import passport from 'passport';

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser("SecretCookie"))

//sessions mongo
const URI = 
    "mongodb+srv://doymarurbina:4O0DGavLrdvH4t18@cluster0.duapyc4.mongodb.net/ecommerce?retryWrites=true&w=majority"
app.use(
    session({
        store: new MongoStore({
            mongoUrl: URI,
        }),
        secret: "secretSession",
        cookie: {maxAge: 60000},
    })
)

//passport
app.use(passport.initialize());
app.use(passport.session());

//handlebars
app.engine('handlebars',engine());
app.set('views',__dirname + '/views');
app.set('view engine','handlebars');

//routes
app.use('/',viewsRouter);
app.use('/api/users',usersRouter);
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
app.use('/api/cookie', cookieRouter);
app.use('/api/sessions', sessionsRouter);

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);
const messages = [];
socketServer.on('connection',socket=>{
    console.log(`Cliente conectado: ${socket.id}`);
    socket.on('newUser',(user)=>{
        socket.broadcast.emit("userConnected", user);
        socket.emit("connected");
    })
    socket.on('message', async(infoMessage)  =>{
        messages.push(infoMessage);
        console.log(infoMessage);
        await MessageManager.createOne(infoMessage);
        socketServer.emit('chat',messages);
    })
});
