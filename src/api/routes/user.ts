import { Router } from 'express';
import { userController } from '../controllers';

class UserRoute{

    public router: Router = Router();

    constructor(){
        this.router.route('/')
            .get( userController.getUsers )
            .post( userController.insertUser );
        this.router.route('/:id')
            .get( userController.getUserById )
            .patch( userController.modifyUserById )
            .delete( userController.deleteUserById );
    }
}

const userRouter = new UserRoute();

export default userRouter.router;