import DropdownComponent from './DropdownComponent'
import { useDispatch, useSelector } from 'react-redux'
import { setSortingFilter } from '../reducers/sortingFilterReducer'

const Sorting = () => {
  const dispatch = useDispatch()
  const sortingFilter = useSelector(({ sortingFilters }) => sortingFilters)

  const handleOptionClick = (e) => {
    dispatch(setSortingFilter(e.target.innerText))
  }

  return (
    <div className="flex items-center flew-wrap flex-col my-3 justify-center ">
      <DropdownComponent
        selectedOption={sortingFilter}
        options={['Distance', 'Tags', 'Age', 'Fame']}
        handleClick={handleOptionClick}
      />
    </div>
  )
}

export default Sorting
