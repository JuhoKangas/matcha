import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (filter) => {
  // age, distance, tags, fame
  // ordered by: all options, default: distance
  //TODO: add change in css when clicking

  const dispatch = useDispatch()

  const handleChange = (name) => {
    // input-field value is in variable event.target.value
    // const text = event.target.value
    dispatch(filterChange(name))
  }

  console.log('in Filter filter is: ', filter)
  return (
    <div
      className="px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl hover:bg-chitty-chitty hover:text-white w-min whitespace-nowrap text-sm cursor-pointer"
      onClick={handleChange(filter.filter)}
    >
      {filter.filter}
    </div>
  )
}

export default Filter
