function Input() {
    return (<>
    <div className="inputMsg">
        <input type="text" placeholder="Write a message.."/>
        <div className="send">
        {/* <img src="https://img.icons8.com/material-outlined/100/null/image.png"/> */}
            <input type="file"  id="file" style={{display:"none"}}/>
            <label htmlFor="file">
            <img src="https://img.icons8.com/material-outlined/100/null/image.png"/>
            </label>
            <button><img src="https://img.icons8.com/ios-glyphs/400/null/filled-sent.png"/></button>
        </div>
    </div>
    </> );
}

export default Input;