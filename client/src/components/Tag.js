const Tag = (props) => {
  if (props.hover === 'none') {
    return (
      <div className="px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl w-min whitespace-nowrap text-sm">
        {props.tagName}
      </div>
    )
  } else {
    return (
      <div
        className="px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl hover:bg-chitty-chitty hover:text-white w-min whitespace-nowrap text-sm cursor-pointer"
        onClick={props.onClick}
      >
        {props.tagName}
      </div>
    )
  }
}

export default Tag
