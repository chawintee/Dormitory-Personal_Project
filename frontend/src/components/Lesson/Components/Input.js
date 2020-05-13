import React from 'react'

function Input(props) {
    const { text, value, name, check, type } = props;
    return (
        <div>
            <div>
                <label>{name}</label>
            </div>
            <input onChange={text} value={value} placeholder={name} onBlur={check} type={type}/>
        </div>
    )
}

export default Input
