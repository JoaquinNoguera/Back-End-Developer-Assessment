import  { Schema, model } from "mongoose";
import { UserInterface } from '../interfaces'

const schema = new Schema({
    fullname: {
        type: {
            firstname: {
                type: 'String',
                required: true
            },
            lastname: {
                type: 'String',
                required: true
            }
        },
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    listShoppingCart: {
        type: [{
            shoppingCart: {
                type: Schema.Types.ObjectId,
                ref: 'ShoppingCart'
            }
        }],
        required: true,
        default: []
    }
})

export default model<UserInterface>("User", schema)