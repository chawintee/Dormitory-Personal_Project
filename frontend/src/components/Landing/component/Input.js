import React from 'react'

function Input(props) {
    const {textValue,name,value} = props
    return (
        <div>
            <label>{name}</label>
            <input onChange={textValue} value={value} placeholder={name} />
        </div>
    )
}

export default Input
