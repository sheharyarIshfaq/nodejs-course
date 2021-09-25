require("../src/db/mongoose");
const User = require("../src/models/user");

//promise chaining
// User.findByIdAndUpdate("614e968cbfcb4c002ce99283", { age: 19 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 19 });
//   })
//   .then((countedUsers) => console.log(countedUsers))
//   .catch((error) => console.log(error));

//async await
const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("614e968cbfcb4c002ce99283", 20)
  .then((count) => console.log(count))
  .catch((error) => console.log(error));
