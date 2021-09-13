const fs = require("fs");

const bufferData = fs.readFileSync("1-json.json");
const jsonData = bufferData.toString();
const parsedData = JSON.parse(jsonData);
parsedData.name = "Sheharyar";
parsedData.age = 20;

//storing in the file
const data = JSON.stringify(parsedData);
fs.writeFileSync("1-json.json", data);
