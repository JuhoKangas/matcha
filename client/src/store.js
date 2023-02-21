import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './reducers/usersReducer'
import filteredUsersReducer from './reducers/filteredUsersReducer'
import userReducer from './reducers/userReducer'
import tagFilterReducer from './reducers/tagFilterReducer'
import tagsReducer from './reducers/tagsReducer'
import ageFilterReducer from './reducers/ageFilterReducer'
import distanceFilterReducer from './reducers/distanceFilterReducer'
import fameFilterReducer from './reducers/fameFilterReducer'
import sortingFilterReducer from './reducers/sortingFilterReducer'
import chatReducer from './reducers/chatReducer'
import messageReducer from './reducers/messageReducer'
import likesReducer from './reducers/likesReducer'
import matchesReducer from './reducers/matchesReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    filteredUsers: filteredUsersReducer,
    tags: tagsReducer,
    tagFilters: tagFilterReducer,
    ageFilters: ageFilterReducer,
    distanceFilters: distanceFilterReducer,
    fameFilters: fameFilterReducer,
    sortingFilters: sortingFilterReducer,
    chats: chatReducer,
    messages: messageReducer,
    likes: likesReducer,
    matches: matchesReducer,
  },
})

export default store
