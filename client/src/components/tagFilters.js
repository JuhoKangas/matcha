import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTagFilter, removeTagFilter } from '../reducers/tagFilterReducer'
import { initializeTags } from '../reducers/tagsReducer'
import Tag from './Tag'

const TagFilters = () => {
  const dispatch = useDispatch()
  const allTags = useSelector(({ tags }) => tags)

  useEffect(() => {
    dispatch(initializeTags())
  }, [dispatch])

  const tagFilters = useSelector(({ tagFilters }) => tagFilters)
  console.log('in TagFilters tagFilters is: ', tagFilters)

  const handleTag = (e) => {
    e.preventDefault()
    if (
      e.target.className ===
      'px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl hover:bg-chitty-chitty hover:text-white w-min whitespace-nowrap text-sm cursor-pointer'
    ) {
      e.target.className =
        'px-2 text-white ring-1 ring-chitty-chitty rounded-xl bg-chitty-chitty w-min whitespace-nowrap text-sm cursor-pointer hover:text-chitty-chitty bg-none'
      dispatch(addTagFilter(e.target.innerText))
    } else {
      e.target.className =
        'px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl hover:bg-chitty-chitty hover:text-white w-min whitespace-nowrap text-sm cursor-pointer'
      dispatch(removeTagFilter(e.target.innerText))
    }
  }

  return (
    <div className="flex flex-wrap gap-2 my-3 justify-center w-3/5">
      {allTags.map((tag) => (
        <Tag key={tag.id} tagName={tag.tagname} onClick={handleTag} />
      ))}
    </div>
  )
}

export default TagFilters
