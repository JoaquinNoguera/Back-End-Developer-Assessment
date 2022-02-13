import { Response, Request, NextFunction } from 'express';
import { Types } from 'mongoose';
import { ItemModel } from '../models';
import { HttpException } from '../interfaces';

class ItemController {
    async getItems( req : Request, res: Response, next: NextFunction ) : Promise<void> {
        try{
            const items = await ItemModel.find();
            res.status(200).json(items);
        }catch( _ ){
            const error : HttpException = {
                message: 'INTERNAL SERVER ERROR',
                status: 500
            }
            next(error);
        }
    }

    async getItemById( req : Request, res: Response, next: NextFunction ) : Promise<void> {
        try{
           const id = req.params.id;
           const item = await ItemModel.findById(id);
           if( item ) {
               res.status(200).json(item);           
           } else {
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

    async insertItem( req : Request, res: Response , next: NextFunction ) : Promise<void> {
        try{
            let newItem = req.body;
            const item = await ItemModel.create( newItem );
            res.status(201).json(item);            
        }catch(_){
            const error : HttpException = {
                message: 'INTERNAL SERVER ERROR',
                status: 500
            }
        next(error);
        }
    }

    async modifyItemById( req : Request, res: Response , next: NextFunction ) : Promise<void> {
        try{
            let newData = req.body;
            const id = req.params.id;
            const item = await ItemModel.findByIdAndUpdate(id, newData,{ new: true });
            if(item){
                res.status(200).json(item);
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

    async deleteItemById( req : Request, res: Response , next: NextFunction ) : Promise<void> {
        try{
            const id = req.params.id;
            await ItemModel.findByIdAndDelete(id);
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

export const itemController = new ItemController();