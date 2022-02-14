import { Response, Request, NextFunction } from 'express';
import { ShoppingCartModel } from '../models';
import { HttpException } from '../interfaces';

class ShoppingCartController {
    async getShoppingCarts( req : Request, res: Response, next: NextFunction ) : Promise<void> {
        try{
            const carts = await ShoppingCartModel.find();
            res.status(200).json(carts);
        }catch(_){
            const error : HttpException = {
                message: 'INTERNAL SERVER ERROR',
                status: 500
            }
            next(error);;
        }
    }
    async getShoppingCartById( req : Request, res: Response, next: NextFunction ) : Promise<void> {
        try{
            const id = req.params.id;
            const cart = await ShoppingCartModel.findById(id);

            if( cart ){
                res.status(200).json(cart);           
            }else{
                const error : HttpException = {
                    message: 'NOT FOUND',
                    status: 404
                }
                next(error);
            }
         }catch(_){
            const error : HttpException = {
                message: 'INTERNAL SERVER ERROR',
                status: 500
            }
            next(error);
         }
    }

    async insertShoppingCart( req : Request, res: Response, next: NextFunction ) : Promise<void> {
        try{
            const newCart = req.body;
            const cart = await ShoppingCartModel.create( newCart );
            res.status(201).json(cart);            
        }catch(_){
            const error : HttpException = {
                message: 'INTERNAL SERVER ERROR',
                status: 500
            }
            next(error);
        }
    }

    async modifyShoppingCartById( req : Request, res: Response , next: NextFunction ) : Promise<void> {
        try{
            const newData = req.body;
            const id = req.params.id;
            const cart = await ShoppingCartModel.findByIdAndUpdate(id, newData,{ new: true });
            if(cart){
                res.status(200).json(cart);
            }else{
                const error : HttpException = {
                    message: 'NOT FOUND',
                    status: 404
                }
                next(error);
            }
        }catch(_){
            const error : HttpException = {
                message: 'INTERNAL SERVER ERROR',
                status: 500
            }
            next(error);
        }
    }

    async deleteShoppingCartById( req : Request, res: Response, next: NextFunction ) : Promise<void> {
        try{
            const id = req.params.id;
            await ShoppingCartModel.findByIdAndDelete(id);
            res.status(200).json(true);
        }catch(_){
            const error : HttpException = {
                message: 'INTERNAL SERVER ERROR',
                status: 500
            }
            next(error);
        }
    }
}

export const shoppingCartController = new ShoppingCartController();