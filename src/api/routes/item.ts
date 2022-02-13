import { Router } from 'express';
import { itemController } from '../controllers';

class ItemRoute{

    public router: Router = Router();

    constructor(){
        this.router.route('/')
            .get( itemController.getItems )
            .post( itemController.insertItem );
        this.router.route('/:id')
            .get( itemController.getItemById )
            .patch( itemController.modifyItemById )
            .delete( itemController.deleteItemById );
    }
}

const productRouter = new ItemRoute();

export default productRouter.router;