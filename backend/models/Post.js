module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        PostNo: {
            type: DataTypes.STRING,
        },
        Status: {
            type: DataTypes.BOOLEAN,
        },
        ReceiveDate: {
            type: DataTypes.DATE,
        },
        CompleteDate: {
            type: DataTypes.DATE,
        },
        PostOwnerName: {
            type: DataTypes.STRING,
        },
        Detail: {
            type: DataTypes.STRING,
        },
    });

    Post.associate = models => {
        Post.belongsTo(models.Room)
    }


    return Post;
}