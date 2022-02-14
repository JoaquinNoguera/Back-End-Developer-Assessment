function generateDataUser(requestParams, ctx, ee, next) {
    ctx.vars["fullname"] = {
        firstname: ctx.vars["firstname"],
        lastname: ctx.vars["lastname"]
    }
    return next();
}

function generateDataItem(requestParams, ctx, ee, next) {
    ctx.vars["price"] = {
        priceNumber: Number.parseFloat(ctx.vars["priceNumber"])
    }
    return next();
}

function generateDataCart(requestParams, ctx, ee, next) {
    ctx.vars["items"] = [{
        cant: Number.parseInt(ctx.vars["cant"]),
        item: ctx.vars["idItem"],
        itemPrice: ctx.vars["priceNumber"],
        discount: {
            discountType:  Number.parseInt(ctx.vars["discountType"]),
            amount:  Number.parseFloat(ctx.vars["discountAmount"])
        }
    }];
    return next();
}

module.exports = {
    generateDataUser,
    generateDataItem,
    generateDataCart
};