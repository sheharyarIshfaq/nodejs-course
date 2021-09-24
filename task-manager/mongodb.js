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
    //   .deleteMany({ age: 20 })
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log(error));

    db.collection("tasks")
      .deleteOne({ description: "Go to Gym" })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }
);
