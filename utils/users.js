const users = [];

const addUsers = ({ id, username, room }) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getAllUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUsers,
  removeUser,
  getAllUsersInRoom,
};
