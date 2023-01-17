import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/userReducer'
import filterReducer from './reducers/filterReducer'
import tagsReducer from './reducers/tagsReducer'

const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    filters: filterReducer,
    tags: tagsReducer,
  },
})

export default store
