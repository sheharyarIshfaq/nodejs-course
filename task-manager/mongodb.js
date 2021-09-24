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
    db.collection("users").insertOne(
      {
        _id: id,
        name: "Aslam",
        age: 53,
      },
      (error, result) => {
        if (error) {
          console.log("Unable to insert the user in the database");
          return;
        }

        console.log(result.insertedId);
      }
    );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Ali Haider",
    //       age: 19,
    //     },
    //     {
    //       name: "Abdullah",
    //       age: 14,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert Users in the Database");
    //     }

    //     console.log(result.insertedIds);
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Learn Mongodb",
    //       completed: true,
    //     },
    //     { description: "Go to Gym", completed: false },
    //     {
    //       description: "Eat the lunch",
    //       completed: true,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert the tasks into database");
    //     }

    //     console.log(result.insertedIds);
    //   }
    // );
  }
);
