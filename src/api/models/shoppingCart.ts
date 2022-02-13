import  { Schema, model } from "mongoose";
import { ShoppingCartInterface, ModifyPriceType, ItemCart } from "../interfaces";

const itemCartShema = new Schema({
    cant: {
        type: 'Number',
        required: true,
        default: 1
    },
    subtotal: async function(){
        try{
            switch (this.discount.discountType){
                case ModifyPriceType.AMOUNT:{
                    return this.itemPrice - this.discount.amount;
                }
                case ModifyPriceType.PORCENTAGE:{
                    return this.itemPrice - ( this.itemPrice * this.discount.amount );
                }
                default: 
                    return 0;
            }
        }catch(err){
            throw err;
        }
    },
    discount: {
        discountType: {
            type: 'Number',
            required: true,
            default: ModifyPriceType.AMOUNT
        },
        amount: {
            type: 'Number',
            required: true,
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
        required: true,
        default: 0,        
    },
    subtotal: {
        type: 'Number',
        required: true,
        default: function() {
            let subtotal = 0;
            this.items.foreach( ( el : ItemCart ) => {
                subtotal += el.subtotal;
            });
            return subtotal;
        }
    },
    total: {
        type: 'Number',
        default: function() {
            return this.subtotal + ( this.subtotal * this.taxes );
        },
        require: true
    },
    abandoned: {
        type: 'Boolean',
        default: false,
        required: true
    },
    items: {
        type: [itemCartShema],
        required: true,
        default: []
    }
})

export default model<ShoppingCartInterface>("ShoppingCart", schema);