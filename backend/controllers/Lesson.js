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
    const Province = req.body.Province;
    const PostCode = req.body.PostCode;
    const BookAccount = req.body.BookAccount;

    const user = await db.Lesson.findOne({ Where: { Username: Username } })

    if (user) {
        res.status(400).send({ message: "Username already use" })
    } else {

        const salt = bcryptjs.genSalt(8);
        const hashedPassword = bcryptjs.hashSync(Password,salt);

        db.Lesson.create({
            Username,
            Password: hashedPassword,
            Name,
            Surname,
            Mobile,
            Address,
            Photo,
            DormitoryPhone,
            Province,
            PostCode,
            BookAccount,
        })

        res.status(201).send({message: "User created."})

    }
}

const check = (req,res) => {
    const Hello = req.body.hello;

    res.status(200).send({message: `OK ${Hello}`})
}







module.exports = {registerLesson,check}