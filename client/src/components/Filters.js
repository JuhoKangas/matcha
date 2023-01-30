import React from 'react'
import TagFilters from './TagFilters'
import AgeFilters from './AgeFilters'

const Filters = () => {
  return (
    <div className="flex items-center flew-wrap flex-col gap-2 my-3 justify-center">
      <TagFilters />
      <AgeFilters />
    </div>
  )
}

export default Filters
