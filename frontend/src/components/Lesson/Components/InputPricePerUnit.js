import React from 'react'

function InputPricePerUnit(props) {
    const {name, pricePerUnitValue, handle, defaultPricePerUnit} = props
    return (
        <span>
            <label>{name}</label>
            <input placeholder={name} value={pricePerUnitValue} onChange={handle} defaultValue={defaultPricePerUnit}></input>
        </span>
    )
}

export default InputPricePerUnit
