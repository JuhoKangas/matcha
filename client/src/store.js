import { configureStore } from "@reduxjs/toolkit"

import usersReducer from "./reducers/usersReducer"
import userReducer from "./reducers/userReducer"

const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
  },
})

export default store
