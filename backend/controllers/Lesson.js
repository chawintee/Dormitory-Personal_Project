const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerLesson = async (req, res) => {
    console.log("Hello")
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

    console.log(Username)
    const user = await db.Lesson.findOne({ Where: { Username: Username } })



    if (user) {
        res.status(400).send({ message: "Username already use" })
    } else {

        // res.send(`${Username}
        // ${Password}
        // ${Name}
        // ${Mobile} 
        // ${Address}  
        // ${Photo}  
        // ${DormitoryPhone}  
        // ${Province}  
        // ${PostCode}  
        // ${BookAccount} ` )

        // console.log(object)(`${Username}
        // ${Password}
        // ${Name}
        // ${Mobile} 
        // ${Address}  
        // ${Photo}  
        // ${DormitoryPhone}  
        // ${Province}  
        // ${PostCode}  
        // ${BookAccount} ` )







        const salt = bcryptjs.genSaltSync(8);
        const hashedPassword = bcryptjs.hashSync(Password,salt);
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
            Province,
            PostCode,
            BookAccount,
        })

        // res.send(user);
        res.status(201).send({message: "User created."})

    }
}








module.exports = { registerLesson, }