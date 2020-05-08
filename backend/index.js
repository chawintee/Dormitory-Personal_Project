const express = require('express')
const app = express();
const db = require('./models')
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

app.get('/', (req, res) => {
    db.Lesson.findAll()
    .then(result=>res.send(result))
    .catch(err=>res.send(err))
    // res.send("Hello");
    // console.log("Test");
})

const LessonRoute = require('./routes/Lesson');
app.use('/Lesson', LessonRoute);

const OccupantRoute = require('./routes/Occupant');
app.use('/Occupant', OccupantRoute);

const roomRoute = require('./routes/Room');
app.use('/Room',roomRoute);


db.sequelize.sync({ force: false }).then(() => {

    app.listen(8000, () => {
        console.log("Server is running in port 8000")
    })

})


