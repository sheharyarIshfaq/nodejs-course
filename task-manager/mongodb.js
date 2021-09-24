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

    // db.collection("users").findOne(
    //   { _id: new ObjectId("614c8a6d0353ab35d1ac606b") },
    //   (error, user) => {
    //     if (error) {
    //       return "Unable to connect to database!";
    //     }
    //     console.log(user);
    //   }
    // );

    // db.collection("users")
    //   .find({ age: 20 })
    //   .toArray((error, users) => {
    //     if (error) {
    //       console.log("Unable to connect to database");
    //     }
    //     console.log(users);
    //   });

    // db.collection("users")
    //   .find({ age: 20 })
    //   .count((error, count) => {
    //     if (error) {
    //       console.log("Unable to connect to database");
    //     }
    //     console.log(count);
    //   });

    //Challenge
    db.collection("tasks").findOne(
      { _id: new ObjectId("614c8b9172cddcc433a32f4d") },
      (error, task) => {
        if (error) {
          console.log("Unable to connect to database");
        }
        console.log(task);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        if (error) {
          console.log("Unable to connect to database");
        }
        console.log(tasks);
      });
  }
);
