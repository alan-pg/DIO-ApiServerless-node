const createMongoCLient = require('../shared/mongoClient');

module.exports = async function (context, req) {
    const product = req.body;
    const { client: MongClient, closeConnectionFn } = await createMongoCLient();
    const Products = MongClient.collection('products');
    const res = await Products.insert(product);
    closeConnectionFn();

    context.res = {
        status: 201,
        body: res,
    };
}