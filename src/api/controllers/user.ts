import { Response, Request, NextFunction } from 'express';
import { UserModel } from '../models';
import { HttpException } from '../interfaces';

class UserController {
    async getUsers( req : Request, res: Response, next: NextFunction ) : Promise<void> {
       try{
           const users = await UserModel.find();
           res.status(200).json(users);
       }catch(_){
            const error : HttpException = {
                message: 'INTERNAL SERVER ERROR',
                status: 500
            }
            next(error);
       }
    }
    async getUserById( req : Request, res: Response, next: NextFunction ) : Promise<void> {
       try{
           const id = req.params.id;
           const user = await UserModel.findById(id);
           if( user ){
               res.status(200).json(user);           
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

    async insertUser( req : Request, res: Response, next: NextFunction ) : Promise<void> {
        try{
            const newUser = req.body;
            const user = await UserModel.create( newUser );
            res.status(201).json(user);            
        }catch(_){
            const error : HttpException = {
                message: 'INTERNAL SERVER ERROR',
                status: 500
            }
            next(error);
        }
    }

    async modifyUserById( req : Request, res: Response, next: NextFunction ) : Promise<void> {
        try{
            const newData = req.body;
            const id = req.params.id;
            const user = await UserModel.findByIdAndUpdate(id, newData, { new: true });
            if( user ){
                res.status(200).json(user);
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

    async deleteUserById( req : Request, res: Response, next: NextFunction ) : Promise<void> {
        try{
            const id = req.params.id;
            await UserModel.findByIdAndDelete(id);
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

export const userController = new UserController();