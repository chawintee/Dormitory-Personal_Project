const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerOccupant = async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;
    const Name = req.body.Name;
    const Surname = req.body.Surname;
    const Mobile = req.body.Mobile;
    const Address = req.body.Address;
    const Photo = req.body.Photo;
    // console.log(Username)

    const user = await db.Occupant.findOne({ where: { Username: Username } });
    // res.send(user)

    if (user) {
        res.status(201).send({ message: "Invalid Username or Password" });
    } else {
        const salt = bcryptjs.genSaltSync(8)
        const hashedPassword = bcryptjs.hashSync(Password, salt);
        await db.Occupant.create({
            Username,
            Password: hashedPassword,
            Name,
            Surname,
            Mobile,
            Address,
            Photo,
        })

        const user1 = await db.Occupant.findOne({where :{Username: Username}})
        console.log(user1.data)
        // res.status(201).send({ message: "User created" });
        res.status(201).send({result : user1,message:"User created"});
    }
}

const loginOccupant = async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;

    const user = await db.Occupant.findOne({ where: { Username: Username } });

    if (!user) {
        res.status(201).send({ message: "Invalid Username or Password" });
    } else {
        const isSuccess = bcryptjs.compareSync(Password, user.Password);
        // res.send(isSuccess);
        if (isSuccess) {
            const payload = {
                id: user.id,
                // Name: user.Name,
                // Surname: user.Surname,
                // Photo: user.Photo,
            }
            const token = jwt.sign(payload, "Dorm", { expiresIn: 7200 });
            res.status(200).send({token: token})
        } else {
            res.status(400).send({ message: "Invalid Username or Password" })
        }
    }
}

const getOccupantById = async (req,res) => {
    const id = req.params.id;
    // console.log(id)
    const LessonData = await db.Occupant.findOne({where : {id : id}});
    // console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------------------")
    // console.log(LessonData)
    if(LessonData){
        res.status(200).send({LessonData:LessonData})
    }else{
        res.status(400).send({message:"Don't have data of occupantId"})
    }
}


const checkUsername = async (req,res) => {
    const username = req.body.username;
    // console.log(username)
    const user = await db.Occupant.findOne({where : {Username: username}});
    if(user){
        res.status(404).send({message:"Invalid Username"})
    }
    else{
        res.status(201).send({result:user})
    }
}














module.exports = { registerOccupant, loginOccupant,getOccupantById,checkUsername }