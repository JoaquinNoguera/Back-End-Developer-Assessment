import  { Schema, model } from "mongoose";
import { ShoppingCartInterface, ModifyPriceType, ItemCart } from "../interfaces";

const itemCartShema = new Schema({
    cant: {
        type: 'Number',
        required: true,
        default: 1
    },
    subtotal:{
        type: 'Number',
        default: function(){
                switch (this.discount.discountType){
                    case ModifyPriceType.AMOUNT:{
                        return ( this.itemPrice - this.discount.amount ) * this.cant;
                    }
                    case ModifyPriceType.PORCENTAGE:{
                        return ( this.itemPrice - ( this.itemPrice * this.discount.amount ) ) * this.cant;
                    }
                    default: 
                        return 0;
                }
        }
    },
    discount: {
        discountType: {
            type: 'Number',
            default: ModifyPriceType.AMOUNT
        },
        amount: {
            type: 'Number',
            default: 0
        }
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    itemPrice: {
        type: 'Number',
        required: true,
        default: 0,

    }
});

const schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    taxes:{
        type: 'Number',
        default: 0,        
    },
    subtotal: {
        type: 'Number',
        default: function() {
            let value = 0;
            const items : Array<ItemCart> = this.items;
            items.forEach( el => {
                value += el.subtotal;
            })
            return value;
        }
    },
    total: {
        type: 'Number',
        default: function() {
            return this.subtotal + ( this.subtotal * this.taxes );
        },
    },
    abandoned: {
        type: 'Boolean',
        default: false,
    },
    items: {
        type: [itemCartShema],
        default: []
    }
})

export default model<ShoppingCartInterface>("ShoppingCart", schema);