const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;
    const Name = req.body.Name;
    const Surname = req.body.Surname;
    const Mobile = req.body.Mobile;
    const Address = req.body.Address;
    const Photo = req.body.Photo;

    const user = await db.Occupant.findOne({ where: { Username: Username } });

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
        const user1 = await db.Occupant.findOne({ where: { Username: Username } })
        res.status(201).send({ result: user1, message: "User created" });
    }
}

const login = async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;

    const user = await db.Occupant.findOne({ where: { Username: Username } });

    if (!user) {
        res.status(201).send({ message: "Invalid Username or Password" });
    } else {
        const isSuccess = bcryptjs.compareSync(Password, user.Password);
        if (isSuccess) {
            const payload = {
                id: user.id,
            }
            const token = jwt.sign(payload, "Dorm", { expiresIn: 7200 });
            res.status(200).send({ token: token })
        } else {
            res.status(400).send({ message: "Invalid Username or Password" })
        }
    }
}

const get = async (req, res) => {
    const id = req.params.id;
    const occupantData = await db.Occupant.findOne({ where: { id: id }, attributes: ['id', 'Username', 'Name', 'Surname', 'Mobile', 'Address'] });
    if (occupantData) {
        res.status(200).send({ occupantData: occupantData })
    } else {
        res.status(400).send({ message: "Don't have data of occupantId" })
    }
}


const checkUsername = async (req, res) => {
    const username = req.body.username;
    const user = await db.Occupant.findOne({ where: { Username: username } });
    if (user) {
        res.status(404).send({ message: "Invalid Username" })
    }
    else {
        res.status(201).send({ result: user })
    }
}

module.exports = { register, login, get, checkUsername }