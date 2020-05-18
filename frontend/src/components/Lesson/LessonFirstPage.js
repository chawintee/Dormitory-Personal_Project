import React from 'react'
import { Link } from 'react-router-dom'

function LessonFirstPage() {
    return (
        <div>
            <h1>This is LessonFirstPage</h1>
            <Link to='/AddNewOccupant'/>
            <Link to='/MeterManage'/>
        </div>
    )
}

export default LessonFirstPage 
