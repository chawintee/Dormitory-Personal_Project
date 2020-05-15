import React from 'react'

function Input(props) {
    const { textValue, name, value, type } = props
    return (
        <div>
            <label>{name}</label>
            <input type={type} onChange={textValue} value={value} placeholder={name} />
        </div>
    )
}

export default Input
