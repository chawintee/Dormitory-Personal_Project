module.exports = (sequelize,DataTypes) => {
    const Lesson = sequelize.define('Lesson',{
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Password: {
            type: DataTypes.STRING
        },
        Name: {
            type : DataTypes.STRING
        },
        Surname : {
            type : DataTypes.STRING
        },
        Mobile : {
            type : DataTypes.INTEGER
        },
        Address : {
            type : DataTypes.STRING
        },
        Photo : {
            type : DataTypes.STRING
        }, 
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