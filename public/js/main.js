const USER_INPUT = {
  SUBSCRIBE: "subscribe",
  UNSUBSCRIBE: "unsubscribe",
};

const goodBye = `Are you sure you want to leave?`;

const unSubscribeCheck = `You'll no longer receive messages from socket client! Are you sure you want to unsubscribe?`;

const invalidMessage = `You can only send subscribe or unsubscribe messages!`;

const chatMessages = document.querySelector(".chat-messages");

const chatForm = document.querySelector(".chat-form");

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

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let msg = e.target.elements.msg.value;
  msg = msg.trim();
  console.log(msg);
  if (!msg) return false;
  if (msg === USER_INPUT.SUBSCRIBE) {
    socket.emit("subscribe", msg);
  } else if (msg === USER_INPUT.UNSUBSCRIBE) {
    socket.emit("unsubscribe", msg);
    confirm(unSubscribeCheck);
    document.querySelector(".alert.success").style.display = "block";
  } else if (msg !== USER_INPUT.SUBSCRIBE && msg !== USER_INPUT.UNSUBSCRIBE) {
    alert(invalidMessage);
  }
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

const renderMessage = (message) => {
  const div = document.createElement("div");
  const displayText = JSON.stringify(message.args);
  div.classList.add("message");
  const paragraph1 = document.createElement("p");
  paragraph1.classList.add("meta");
  paragraph1.innerText = `${message.username} ${message.time}`;
  div.appendChild(paragraph1);
  const paragraph2 = document.createElement("p");
  paragraph2.classList.add("text");
  paragraph2.innerText = displayText;
  div.appendChild(paragraph2);
  document.querySelector(".chat-messages").appendChild(div);
};

document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm(goodBye);
  if (leaveRoom) {
    window.location = "../index.html";
  } else {
  }
});

const renderRoomNameAndUsers = (room, users) => {
  document.querySelector(".room-name").innerText = room;
  document.querySelector(".users").innerText =
    users.length > 1
      ? `${users.length} users online`
      : `${users.length} user online`;
};

const handleAlertClose = () => {
  document.querySelector(".alert.success").style.display = "none";
};
