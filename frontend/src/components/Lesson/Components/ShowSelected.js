import React from 'react'

function ShowSelected(props) {

    const {handle, defaultValue, arrValue } = props;

    return (
        <span>
            <select onChange={handle} defaultValue={defaultValue}>
                {arrValue.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
        </span>
    )
}

export default ShowSelected
