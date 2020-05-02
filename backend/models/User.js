module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('User',{
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
        } 
    })


    return User
}