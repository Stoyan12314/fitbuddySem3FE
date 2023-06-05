import authHeader from "./auth-header";
import api from "./http-common";

const getAllUsers = () => {
  return api.get("/messages/users", {
    headers: {
      ...authHeader(),
    },
  });
};

const getTrainerId = (userId) => {
  return api.post(`/messages/${userId}`, {
    headers: {
      ...authHeader(),
    },
  });
};

const getChatHistory = (userId, trainerId) => {
  return api.get(`/messages/chat/${userId}/${trainerId}`, {
    headers: {
      ...authHeader(),
    },
  });
};

const sendMessage = (message, username) => {
  return api.post(`/chat/${username}`, message, {
    headers: {
      ...authHeader(),
    },
  });
};

const ChatService = {
  getTrainerId,
  getAllUsers,
  getChatHistory,
  sendMessage,
};

export default ChatService;
