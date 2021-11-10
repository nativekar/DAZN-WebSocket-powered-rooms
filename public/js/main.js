const chatMessages = document.querySelector(".chat-messages");

//fetch usernames and room name from url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom action
socket.emit("joinRoom", { username, room });

socket.on("roomData", ({ room, users }) => {
  renderRoomNameAndUsers(room, users);
});

socket.on("message", (message) => {
  renderMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

const renderMessage = (message) => {
  const div = document.createElement("div");
  const displayText = JSON.stringify(message.args);
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">${displayText}</p>
    `;
  document.querySelector(".chat-messages").appendChild(div);
};

document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave?");
  if (leaveRoom) {
    window.location = "../index.html";
  } else {
  }
});

const renderRoomNameAndUsers = (room, users) => {
  document.querySelector(".room-name").innerText = room;
  document.querySelector(".users").innerText =
    users.length >= 1
      ? `${users.length} user online`
      : `${users.length} users online`;
};
