import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFilter, removeFilter } from '../reducers/filterReducer'
import { initializeTags } from '../reducers/tagsReducer'
import Tag from './Tag'

const Filters = () => {
  const dispatch = useDispatch()
  const allTags = useSelector(({ tags }) => tags)

  useEffect(() => {
    dispatch(initializeTags())
  }, [dispatch])

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
        <Tag key={tag.id} tagName={tag.tagname} onClick={handleTag} />
      ))}
    </div>
  )
}

export default Filters
