import 'dotenv/config';
import express, { Application } from 'express';
import { errorHandlerMiddleware } from './api/middlewares';
import { userRoute, itemRouter, shoppingCartRouter } from './api/routes';
import { default as initDB } from './config'

initDB();

class Server{

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        this.app.set('port', process.env.PORT || 8080); 
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(errorHandlerMiddleware);
    }

    public routes(): void {
        this.app.use('/api/user',userRoute);
        this.app.use('/api/item',itemRouter);
        this.app.use('/api/shopping-cart',shoppingCartRouter)
    }

    public start(): void {
        this.app.listen(this.app.get('port'));       
    }
}

const server = new Server();
server.start();