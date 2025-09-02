// src/api/chatApi.js
import axios from 'axios';

export const sendMessageToAI = async (message) => {
  const res = await axios.post('/api/chat', { message });
  return res.data.response;
};
