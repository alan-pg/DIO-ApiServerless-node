const createMongoCLient = require('../shared/mongoClient');

module.exports = async function (context, req) {
    const { client: MongClient, closeConnectionFn } = await createMongoCLient();
    const Products = MongClient.collection('products');
    const res = await Products.find({});
    const body = await res.toArray();

    closeConnectionFn();
    context.res = {
        status: 200,
        body: body,
    }
}