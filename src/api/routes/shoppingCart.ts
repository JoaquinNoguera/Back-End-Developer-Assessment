import { Router } from 'express';
import { shoppingCartController } from '../controllers';

class ShoppingCartRoute{

    public router: Router = Router();

    constructor(){
        this.router.route('/')
            .get( shoppingCartController.getShoppingCarts )
            .post( shoppingCartController.insertShoppingCart );
        this.router.route('/:id')
            .get( shoppingCartController.getShoppingCartById )
            .patch( shoppingCartController.modifyShoppingCartById )
            .delete( shoppingCartController.deleteShoppingCartById );
    }
}

const shoppingCartRouter = new ShoppingCartRoute();

export default shoppingCartRouter.router;