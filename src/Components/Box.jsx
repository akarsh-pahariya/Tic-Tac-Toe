
function Box(props) {

    return (
        <div className="flex items-center justify-center size-28 text-white border-white border-solid border-2">
            <button className="text-5xl h-full w-full" onClick={() => props.onBoxClick(props.id)}>
              {props.value}
            </button>
        </div>
    )
}

export default Box;