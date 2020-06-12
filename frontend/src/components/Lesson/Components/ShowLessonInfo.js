import React from 'react'

function ShowLessonInfo(props) {
    const {lessonData} = props;
    return (
        <div>
            {/* ShowLessonInfo */}
            <span>
                <span>Lessor id : </span><span>&nbsp;{lessonData.id}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>Dormitory Name : </span><span>&nbsp;{lessonData.DormitoryName}</span>
            </span>
            <div><span>Owner : </span><span>&nbsp;&nbsp;{lessonData.Name} {lessonData.Surname}</span></div>
        </div>
    )
}

export default ShowLessonInfo
