import React from 'react'

function Input(props) {
    const { text, value, name, type, onblur } = props;


    return (
        <div>
            <div>
                <label>{name}</label>
            </div>
                <input onChange={text} value={value} placeholder={name} type={type} required onBlur={onblur} />
        </div>
    )
}

export default Input
