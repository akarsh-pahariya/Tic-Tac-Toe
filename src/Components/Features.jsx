function Features(props) {
    let feature;
    if (props.id === "1") feature = "prev"
    else if (props.id === "2") feature = "restart"
    else if (props.id === "3") feature = "next"
    
    return (
        <div className="flex justify-center pt-5 text-xl text-white">
            <button className='mx-3 border-white border-solid border-2 feature-button' onClick={props.id === "1" ? props.prev : props.id === "2" ? props.restart : props.id === "3" ? props.next : console.log("Error")}>{props.text}</button>
        </div>
    )
}

export default Features;