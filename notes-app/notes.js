const fs = require("fs");
const chalk = require("chalk");

//function to add new note
const addNote = (title, body) => {
  const notes = loadedNotes();

  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note successfully Added!"));
  } else {
    console.log(chalk.red.inverse("Note Title already exists!"));
  }
};

//function to remove a note
const removeNote = (title) => {
  const notes = loadedNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  if (filteredNotes.length === notes.length) {
    console.log(chalk.red.inverse("No Note Found!"));
  } else {
    saveNotes(filteredNotes);
    console.log(chalk.green.inverse("The note has been successfully removed!"));
  }
};

//function to list notes
const listNotes = () => {
  const notes = loadedNotes();
  if (notes.length > 0) {
    console.log(chalk.yellow.inverse("Your Notes:"));
    notes.forEach((note) => console.log(note.title));
  } else {
    console.log(chalk.redBright.inverse('You don"t have any Notes'));
  }
};

//function to read a note
const readNote = (title) => {
  const notes = loadedNotes();
  const noteToRead = notes.find((note) => note.title === title);
  if (noteToRead) {
    console.log(chalk.yellow.inverse("Title: " + noteToRead.title));
    console.log("Body: " + noteToRead.body);
  } else {
    console.log(chalk.red.inverse("Note with the entered Title not found!"));
  }
};

//function to save the notes
const saveNotes = (notes) => {
  const data = JSON.stringify(notes);
  fs.writeFileSync("notes.json", data);
};

//function to load the notes
const loadedNotes = () => {
  try {
    const bufferData = fs.readFileSync("notes.json");
    const dataJSON = bufferData.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
