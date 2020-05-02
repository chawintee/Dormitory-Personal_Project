module.exports = (sequelize,DataTypes) => {
    const Lesson = sequelize.define('Lesson',{
        DormitoryId: {
            type : DataTypes.INTEGER
        },
        DormitoryPhone: {
            type : DataTypes.INTEGER
        },
        Province : {
            type : DataTypes.STRING
        },
        PostCode : {
            type : DataTypes.INTEGER
        },
        BookAccount : {
            type : DataTypes.INTEGER
        }
    })

    
    
    return Lesson
    
}