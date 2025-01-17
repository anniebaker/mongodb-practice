const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const products = require('./products');

// change this to your mongodb atlas uri
const uri = "mongodb+srv://bombdotcom:USxCBX@cluster0-jhgui.mongodb.net/test?retryWrites=true";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true })

// Use connect method to connect to the Server
client.connect(doStuffAfterConnected);

function doStuffAfterConnected(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected successfully to server");
  const db = client.db("productDatabase");
  insertSomething(db, () => {
    findSomething(db, () => {
      client.close();
    });
  });

}

const findSomething = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('products');
  // Find some documents
  let found = collection.find({});
  found.toArray(function (err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback();
  });
}
const insertSomething = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('products');
  // Insert some documents
  collection.insertMany(products, function (err, result) {
    console.log("Inserted documents into the collection");
    callback();
  });
}