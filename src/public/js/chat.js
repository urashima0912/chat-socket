const socket = io();

const writing = document.getElementById("writing");
const messages = document.getElementById("messages");
const username = document.getElementById("username");
const message = document.getElementById("message");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  socket.emit("message", {
    message: message.value,
    username: username.value,
  });
});

message.addEventListener("keypress", () => {
  console.log("escribiendo");
  socket.emit("writing", { username: username.value });
});

socket.on("message", (msg) => {
  console.log({ msg });
  if (msg.username === username.value) {
    messages.innerHTML += `<p><strong>${msg.username}</strong>: ${msg.message}</p>`;
  } else {
    messages.innerHTML += `<p class="green"><strong>${msg.username}</strong>: ${msg.message}</p>`;
  }
  writing.innerHTML = "";
});

socket.on("writing", (msg) => {
  writing.innerHTML = `<strong>${msg.username}</strong> is writing`;
});
