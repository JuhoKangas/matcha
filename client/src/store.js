import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './reducers/usersReducer'
import filteredUsersReducer from './reducers/filteredUsersReducer'
import userReducer from './reducers/userReducer'
// import filterReducer from './reducers/filterReducer'
import tagFilterReducer from './reducers/tagFilterReducer'
import tagsReducer from './reducers/tagsReducer'
import ageFilterReducer from './reducers/ageFilterReducer'
import distanceFilterReducer from './reducers/distanceFilterReducer'

const store = configureStore({
  reducer: {
    users: usersReducer,
    filteredUsers: filteredUsersReducer,
    user: userReducer,
    // filters: filterReducer,
    tags: tagsReducer,
    tagFilters: tagFilterReducer,
    ageFilters: ageFilterReducer,
    distanceFilters: distanceFilterReducer,
  },
})

export default store
