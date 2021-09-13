const notes = require("./notes.js");
const chalk = require("chalk");
const yargs = require("yargs");

yargs.version("2.0.1");

//Create Add Command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//Create Remove Command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Title of Note to Remove",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

//Create a List Command
yargs.command({
  command: "list",
  describe: "List the notes",
  handler() {
    notes.listNotes();
  },
});

//Create a Read Command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Title of Note to Read",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
