import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../interfaces';
 
function errorHandlerMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message =  'INTERNAL SERVER ERROR';
  response
    .status(status)
    .send({
      status,
      message,
    });
}
 
export default errorHandlerMiddleware;