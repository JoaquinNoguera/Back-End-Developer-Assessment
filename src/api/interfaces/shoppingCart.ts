export enum ModifyPriceType{
    'AMOUNT',
    'PORCENTAGE'
}

export default interface ShoppingCart {
    owner: String,
    taxes: Number,
    total: Number,
    abandoned: Boolean,
    items: Array<ItemCart> 
}

export interface ItemCart {
    cant: number,
    subtotal: number,
    discount: {
        discountType: ModifyPriceType,
        amount: number
    },
    item: string,
    itemPrice: string
}