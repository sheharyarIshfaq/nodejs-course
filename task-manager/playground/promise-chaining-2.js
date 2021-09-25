require("../src/db/mongoose");
const Task = require("../src/models/task");

//promise chaining
// Task.findByIdAndDelete("614e9288f3d937f10cd5cb82")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((notCompletedTasks) => console.log(notCompletedTasks))
//   .catch((error) => console.log(error));

//async await
const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("614e91c34b3f6564614cbbfe")
  .then((count) => console.log(count))
  .catch((error) => console.log(error));
