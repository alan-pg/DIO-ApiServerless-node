const createMongoCLient = require('../shared/mongoClient');
const { ObjectID } = require('mongodb');

module.exports = async function (context, req) {
    const { id } = req.params;
    const product = req.body;

    const { client: MongClient, closeConnectionFn } = await createMongoCLient();
    const Products = MongClient.collection('products');
    const res = await Products.findOneAndUpdate(
        { _id: ObjectID(id) },
        { $set: product },
        );

    closeConnectionFn();
    
    context.res = {
        status: 200,
        body: res
    }
}