

export const getChatsStart = () => ({ type: "GET_CHAT_START" });
export const getChatsSuccess = (chats) => ({
  type: "GET_CHAT_SUCCESS",
  payload: chats,
});
export const getChatsFailed = (error) => ({
  type: "GET_CHAT_FAILED",
  payload: error,
});


export const sendMessageStart = () => ({ type: "SEND_MESSAGE_START" });
export const sendMessageSuccess = (chats) => ({
  type: "SEND_MESSAGE_SUCCESS",
  payload: chats,
});
export const sendMessageFailed = (error) => ({
  type: "SEND_MESSAGE_FAILED",
  payload: error,
});