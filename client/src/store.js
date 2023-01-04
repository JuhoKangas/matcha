import { configureStore } from "@reduxjs/toolkit"

import usersReducer from "./reducers/usersReducer"
import userReducer from "./reducers/userReducer"
import chatReducer from "./reducers/chatReducer"
import messageReducer from "./reducers/messageReducer"

const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
		chats: chatReducer,
		messages: messageReducer
  },
})

export default store
