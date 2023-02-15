const DropdownComponent = ({ options, handleClick, selectedOption }) => {
  return (
    <div className="group inline-block relative">
      <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
        <span className="mr-1">{selectedOption}</span>
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>
      <ul className="absolute hidden text-gray-700 group-hover:block rounded bg-gray-200">
        {options.map((option) => (
          <li
            key={option}
            value={option}
            className=" text-chitty-chitty hover:bg-chitty-chitty hover:rounded hover:text-white whitespace-nowrap cursor-pointer p-2"
            onClick={handleClick}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DropdownComponent
