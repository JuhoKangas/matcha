import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactSlider from 'react-slider'

import { fameFilterChange } from '../reducers/fameFilterReducer'

const FameFilters = () => {
  const dispatch = useDispatch()

  const fameFilters = useSelector(({ fameFilters }) => fameFilters)

  return (
    <div className="flex gap-2 my-3 justify-center w-3/5 items-center">
      <p className="flex my-auto justify-center min-w-fit">
        Fame: {fameFilters[0]}
      </p>
      <ReactSlider
        step={1}
        min={0}
        max={3}
        className="flex w-full h-1 items-center bg-gray-200 rounded-md cursor-grab"
        thumbClassName="absolute w-4 h-4 cursor-grab bg-chitty-chitty rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chitty-chitty"
        value={fameFilters}
        onChange={(value) => {
          dispatch(fameFilterChange(value))
        }}
      />
      <p className="flex my-auto justify-center min-w-fit">{fameFilters[1]}</p>
    </div>
  )
}

export default FameFilters
