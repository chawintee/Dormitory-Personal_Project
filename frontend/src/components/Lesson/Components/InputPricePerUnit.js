import React from 'react'

function InputPricePerUnit(props) {
    const {name, PricePerUnitValue, handle} = props
    return (
        <span>
            <label>{name}</label>
            <input placeholder={name} value={PricePerUnitValue} onChange={handle}></input>
                Baht
        </span>
    )
}

export default InputPricePerUnit
