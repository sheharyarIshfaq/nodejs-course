// const mongodb = require("mongodb");

// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectId();

console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Unable to connect to database");
      return;
    }

    const db = client.db(databaseName);

    // db.collection("users")
    //   .updateOne(
    //     { _id: new ObjectId("614c872fc74387017072f387") },
    //     {
    //       $set: {
    //         name: "Inzmam",
    //       },
    //     }
    //   )
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log(error));

    // db.collection("users")
    //   .updateOne(
    //     { _id: new ObjectId("614c872fc74387017072f387") },
    //     {
    //       $inc: {
    //         age: 1,
    //       },
    //     }
    //   )
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log(error));

    db.collection("tasks")
      .updateMany(
        { completed: false },
        {
          $set: {
            completed: true,
          },
        }
      )
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }
);
