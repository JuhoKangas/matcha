import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFilter, removeFilter } from '../reducers/filterReducer'
import Tag from './Tag'

const Filters = () => {
  const dispatch = useDispatch()
  //TODO: get all tags from backend
  const allTags = [
    'stars',
    'cars',
    'photography',
    'climbing',
    'cats',
    'dogs',
    'food',
  ]

  const filters = useSelector(({ filters }) => filters)
  console.log('in Filters filters is: ', filters)

  const handleTag = (e) => {
    e.preventDefault()
    if (
      e.target.className ===
      'px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl hover:bg-chitty-chitty hover:text-white w-min whitespace-nowrap text-sm cursor-pointer'
    ) {
      e.target.className =
        'px-2 text-white ring-1 ring-chitty-chitty rounded-xl bg-chitty-chitty w-min whitespace-nowrap text-sm cursor-pointer hover:text-chitty-chitty bg-none'
      dispatch(addFilter(e.target.innerText))
    } else {
      e.target.className =
        'px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl hover:bg-chitty-chitty hover:text-white w-min whitespace-nowrap text-sm cursor-pointer'
      dispatch(removeFilter(e.target.innerText))
    }
  }

  return (
    <div className="flex flex-wrap gap-2 my-3 justify-center">
      {allTags.map((tag) => (
        <Tag key={tag} tagName={tag} onClick={handleTag} />
      ))}
    </div>
  )
}

export default Filters
