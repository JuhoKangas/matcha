import React from 'react'
// import React, { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { addTagFilter, removeTagFilter } from '../reducers/tagFilterReducer'
// import { initializeTags } from '../reducers/tagsReducer'
// import Tag from './Tag'
import ReactSlider from 'react-slider'

const AgeFilters = () => {
  // const dispatch = useDispatch()

  const [values, setValues] = React.useState([18, 122])
  // const allTags = useSelector(({ tags }) => tags)

  // useEffect(() => {
  //   dispatch(initializeTags())
  // }, [dispatch])

  // const tagFilters = useSelector(({ tagFilters }) => tagFilters)
  // console.log('in TagFilters tagFilters is: ', tagFilters)

  // const handleTag = (e) => {
  //   e.preventDefault()
  //   if (
  //     e.target.className ===
  //     'px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl hover:bg-chitty-chitty hover:text-white w-min whitespace-nowrap text-sm cursor-pointer'
  //   ) {
  //     e.target.className =
  //       'px-2 text-white ring-1 ring-chitty-chitty rounded-xl bg-chitty-chitty w-min whitespace-nowrap text-sm cursor-pointer hover:text-chitty-chitty bg-none'
  //     dispatch(addTagFilter(e.target.innerText))
  //   } else {
  //     e.target.className =
  //       'px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl hover:bg-chitty-chitty hover:text-white w-min whitespace-nowrap text-sm cursor-pointer'
  //     dispatch(removeTagFilter(e.target.innerText))
  //   }
  // }

  return (
    <div className="flex gap-2 my-3 justify-center w-3/5">
      <p className="flex my-auto justify-center min-w-fit">Age: {values[0]}</p>
      <ReactSlider
        step={1}
        min={18}
        max={122}
        className="w-full h-2 pr-2 my-2 bg-gray-200 rounded-md cursor-grab"
        thumbClassName="absolute w-4 h-4 cursor-grab bg-chitty-chitty rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chitty-chitty -top-2px"
        value={values}
        onChange={(value) => {
          setValues(value)
        }}
      />
      <p className="flex my-auto justify-center min-w-fit">{values[1]}</p>
    </div>
  )
}

export default AgeFilters
