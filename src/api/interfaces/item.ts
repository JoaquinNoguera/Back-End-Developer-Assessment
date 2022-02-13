export default interface Item {
    name: string,
    description: string,
    units: number,
    price: {
        priceNumber: number,
        currency: string
    }
}
