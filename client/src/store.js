import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './reducers/usersReducer'
import filteredUsersReducer from './reducers/filteredUsersReducer'
import userReducer from './reducers/userReducer'
import TagFilterReducer from './reducers/TagFilterReducer'
import tagsReducer from './reducers/tagsReducer'
import ageFilterReducer from './reducers/ageFilterReducer'
import distanceFilterReducer from './reducers/distanceFilterReducer'
import fameFilterReducer from './reducers/fameFilterReducer'
import sortingFilterReducer from './reducers/sortingFilterReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    filteredUsers: filteredUsersReducer,
    tags: tagsReducer,
    tagFilters: TagFilterReducer,
    ageFilters: ageFilterReducer,
    distanceFilters: distanceFilterReducer,
    fameFilters: fameFilterReducer,
    sortingFilters: sortingFilterReducer,
  },
})

export default store
