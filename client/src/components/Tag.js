const Tag = (props) => {
  // age, distance, tags, fame
  // ordered by: all options, default: distance
  //TODO: add change in css when clicking
  return (
    <div className="px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl hover:bg-chitty-chitty hover:text-white w-min whitespace-nowrap text-sm cursor-pointer">
      {props.tagName}
    </div>
  )
}

export default Tag
