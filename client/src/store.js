import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './reducers/usersReducer'
import filteredUsersReducer from './reducers/filteredUsersReducer'
import userReducer from './reducers/userReducer'
import filterReducer from './reducers/filterReducer'
import tagFilterReducer from './reducers/tagFilterReducer'
import tagsReducer from './reducers/tagsReducer'
import chatReducer from './reducers/chatReducer'

const store = configureStore({
  reducer: {
    users: usersReducer,
    filteredUsers: filteredUsersReducer,
    user: userReducer,
    filters: filterReducer,
    tagFilters: tagFilterReducer,
    tags: tagsReducer,
		chats: chatReducer
  },
})

export default store
