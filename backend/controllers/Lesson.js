const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerLesson = async (req, res) => {
    // console.log("Hello")
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

    console.log(Username)
    // const user = await db.Lesson.findOne({where:{Username:req.body.Username}});
    const user = await db.Lesson.findOne({ where: { Username: Username } });
    // console.log(user)
    // res.send(user)

    if (user) {
        res.status(400).send({ message: "Username already use" })
    } else {
        const salt = bcryptjs.genSaltSync(8);
        const hashedPassword = bcryptjs.hashSync(Password, salt);
        // res.send(hashedPassword)

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
        // res.send(user);
        // res.status(201).send({ message: "User created." })

        const users = await db.Lesson.findOne({ where: { Username: Username } })
        res.status(201).send({ users: users, message: "User created." });
    }
}

const loginLesson = async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;
    // console.log(Username)

    const user = await db.Lesson.findOne({ where: { Username: Username } });
    // res.send(user)

    if (!user) {
        res.status(201).send({ message: "Invalid username or password" })
    } else {
        const isSuccess = bcryptjs.compareSync(Password, user.Password);
        // console.log("object")
        // res.send(isSuccess);
        if (isSuccess) {
            const payload = {
                id: user.id,
                // Name: user.Name,
                // Surname: user.Surname,
                // Photo: user.Photo,
                // DormitoryName: user.DormitoryName,
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
    // console.log("-----------------------------------------------------------------------------------------------------------------------------------------------");
    // console.log("Hello");
    // console.log(user);
    // console.log("-----------------------------------------------------------------------------------------------------------------------------------------------");
    if (user) {
        res.status(400).send({ message: "Invalid Username" });
    }
    else {
        res.status(200).send({ message: "OK" })
    }
}


const getLessonById = async (req, res) => {
    const id = req.params.id;
    const user = await db.Lesson.findOne({ where: { id: id } })
    res.status(200).send({ result: user });
}

const getLessonDataByOccupantId = async (req,res) => {
    console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
    console.log("OK")
    const id = req.params.id;
    const LessonData = await db.Lesson.findOne({include: [{model: db.Room}]})
}







module.exports = { registerLesson, loginLesson, checkUsername, getLessonById, getLessonDataByOccupantId}