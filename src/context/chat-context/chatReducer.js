const chatReducer = (state, action) => {
  switch (action.type) {
    // CREATE Chat
    case "ADD_CHAT_START":
      return {
        chats: state.chats,
        loadingChats: true,
        error: null,
      };

    case "ADD_CHAT_SUCCESS":
      return {
        chats: state.chats,
        loadingChats: false,
        error: null,
      };

    case "ADD_CHAT_FAILED":
      return {
        chats: state.chats,
        loadingChats: false,
        error: action.payload,
      };

    case "GET_CHAT_START":
      return {
        chats: state.chats,
        loadingChats: true,
        error: null,
      };

    case "GET_CHAT_SUCCESS":
      return {
        chats: action.payload,
        loadingChats: false,
        error: null,
      };

    case "GET_CHAT_FAILED":
      return {
        chats: state.chats,
        loadingChats: false,
        error: action.payload,
      };


      case "SEND_MESSAGE_START":
      return {
        chats: state.chats,
        loadingChats: true,
        error: null,
      };

    case "SEND_MESSAGE_SUCCESS":
      return {
        chats: action.payload,
        loadingChats: false,
        error: null,
      };

    case "SEND_MESSAGE_FAILED":
      return {
        chats: state.chats,
        loadingChats: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default chatReducer;
