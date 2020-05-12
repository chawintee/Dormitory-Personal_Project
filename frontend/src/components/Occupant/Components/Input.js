import React from 'react'

function Input(props) {
    const { text, value, name } = props;


    return (
        <div>
            <div>
                <label>{name}</label>
            </div>
            <input onChange={text} value={value} placeholder={name} />
        </div>
    )
}

export default Input
