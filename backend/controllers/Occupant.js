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
        res.status(201).send({ message: "User created" });
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
        const payload = {
            id: user.id,
            Name: user.Name,
            Surname: user.Surname,
            Photo: user.Photo,
        }
        if (isSuccess) {
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
    const result = await db.Occupant.findOne({where : {id : id}});
    res.status(200).send({result})
}















module.exports = { registerOccupant, loginOccupant,getOccupantById }