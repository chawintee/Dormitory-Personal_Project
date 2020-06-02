import React from 'react'
import { Link } from 'react-router-dom'

function LessonFirstPage() {
    return (
        <div>
            <h1>This is LessonFirstPage</h1>
            <div><Link to='/AddNewOccupant'> Add New Occupants </Link></div>
            <div><Link to='/MeterManage'> Meter Manage </Link></div>
            <div><Link to='/OccupantMange'>Occupant Management</Link></div>
        </div>
    )
}

export default LessonFirstPage 
