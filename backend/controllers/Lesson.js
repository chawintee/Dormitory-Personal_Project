const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerLesson = async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;
    const Name = req.body.Name;
    const Surname = req.body.Surname;
    const Mobile = req.body.Mobile;
    const Address = req.body.Address;
    const Photo = req.body.Photo;
    const DormitoryPhone = req.body.DormitoryPhone;
    const DormitoryName = req.body.DormitoryName;
    const Province = req.body.Province;
    const PostCode = req.body.PostCode;
    const BookAccount = req.body.BookAccount;

    const user = await db.Lesson.findOne({ where: { Username: Username } });
    if (user) {
        res.status(400).send({ message: "Username already use" })
    } else {
        const salt = bcryptjs.genSaltSync(8);
        const hashedPassword = bcryptjs.hashSync(Password, salt);
        await db.Lesson.create({
            Username,
            Password: hashedPassword,
            Name,
            Surname,
            Mobile,
            Address,
            Photo,
            DormitoryPhone,
            DormitoryName,
            Province,
            PostCode,
            BookAccount,
        })
        const users = await db.Lesson.findOne({ where: { Username: Username } })
        res.status(201).send({ users: users, message: "User created." });
    }
}


const loginLesson = async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;

    const user = await db.Lesson.findOne({ where: { Username: Username } });

    if (!user) {
        res.status(201).send({ message: "Invalid username or password" })
    } else {
        const isSuccess = bcryptjs.compareSync(Password, user.Password);
        if (isSuccess) {
            const payload = {
                id: user.id,
            }
            const token = jwt.sign(payload, "Dorm", { expiresIn: 7200 })
            res.status(200).send({ token: token });
        } else {
            res.status(400).send({ message: "Invalid username or password" })
        }
    }
}


const checkUsername = async (req, res) => {
    const Username = req.body.Username;
    const user = await db.Lesson.findOne({ where: { Username: Username } });
    if (user) {
        res.status(400).send({ message: "Invalid Username" });
    }
    else {
        res.status(200).send({ message: "OK" })
    }
}


const get = async (req, res) => {
    const id = req.params.id;
    const user = await db.Lesson.findOne({ where: { id: id }, attributes:['id','Name','Surname','DormitoryName'] })
    res.status(200).send({ result: user });
}


const getLessonDataByOccupantId = async (req, res) => {
    const id = req.params.occupantId;
    const filters = {} ;
    filters['$Rooms.Occupants.id$'] = id;
    filters['$Rooms.Occupants.LiveIn.Status$'] = 1;
    console.log(filters)
    try {
        const RoomData = await db.Room.findOne({include:[{model: db.Occupant ,where:{id: id},attributes:['id']}],attributes:['RoomNumber']})
        const lessonData = await db.Lesson.findAll({ where: filters, include: [{ model: db.Room, attributes:['RoomNumber'], include: [{ model: db.Occupant, attributes:['id'] }] }], attributes:['id','DormitoryName'] })
        const objLessonData = lessonData[0];
        res.send({lessonData:objLessonData ,RoomData:RoomData})
    } catch (e) {
        console.log(e)
        res.send({ message: "error" })
    }
}

module.exports = { registerLesson, loginLesson, checkUsername, get, getLessonDataByOccupantId }