function Features(props) {
    return (
        <div className="flex justify-center pt-5 text-xl text-white ">
            <button className='mx-6 border-white border-solid border-2' onClick={props.restart}>Restart 🔄</button>
        </div>
    )
}

export default Features;