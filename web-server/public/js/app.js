console.log("Client side javascript file is loaded!");

const form = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = search.value;

  message1.textContent = "Loading...";
  message2.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      }
    });
  });

  search.value = "";
});
