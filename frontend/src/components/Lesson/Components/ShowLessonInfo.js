import React from 'react'

function ShowLessonInfo(props) {
    const {lessonData} = props;
    return (
        <div>
            {/* ShowLessonInfo */}
            <span>
                <span>Lesson id : </span><span>{lessonData.id}</span>
                <span>Dormitory Name : </span><span>{lessonData.DormitoryName}</span>
            </span>
            <div><span>Owner : </span><span>{lessonData.Name} {lessonData.Surname}</span></div>
        </div>
    )
}

export default ShowLessonInfo
