const createMongoCLient = require('../shared/mongoClient');
const { ObjectID } = require('mongodb');

module.exports = async function (context, req) {
    const { id } = req.params;

    const { client: MongClient, closeConnectionFn } = await createMongoCLient();
    const Products = MongClient.collection('products');
    const res = await Products.findOneAndDelete( { _id: ObjectID(id) });
    closeConnectionFn();

    context.res = {
        status: 200,
        body: res,
    }


}