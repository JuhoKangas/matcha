const Tag = (props) => {
  if (props.hover === 'none') {
    return (
      <div className="px-2 text-chitty-chitty ring-1 ring-chitty-chitty rounded-xl w-min whitespace-nowrap text-sm">
        {props.tagName}
      </div>
    )
  } else if (props.isSelected === true) {
    return (
      <div
        className="px-2 text-white ring-1 ring-chitty-chitty rounded-xl bg-chitty-chitty w-min whitespace-nowrap text-sm cursor-pointer hover:text-chitty-chitty bg-none"
        onClick={props.onClick}
      >
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
