import  { Schema, model } from "mongoose";
import { ItemInterface } from "../interfaces";

const schema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    description: {
        type: 'String',
        required: true,
        default: ''
    },
    price: {
        type: {
            priceNumber: {
                type: 'Number',
                required: true,
                default: 0,
            },
            currency: {
                type: 'String',
                required: true,
                default: 'USD'
            }
        },
        required: true
    }
});

export default model<ItemInterface>("Item", schema);