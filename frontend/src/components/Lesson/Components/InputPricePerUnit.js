import React from 'react'

function InputPricePerUnit(props) {
    const {name, pricePerUnitValue, handle, defaultPricePerUnit} = props
    return (
        <span>
            <label>{name}</label>
            <input placeholder={name} value={pricePerUnitValue} onChange={handle} defaultValue={defaultPricePerUnit}></input>
                Baht
        </span>
    )
}

export default InputPricePerUnit
