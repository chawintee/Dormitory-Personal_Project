const express = require('express')
const app = express();
const db = require('./models')
const cors = require('cors')

app.use(express.json);
app.use(express.urlencoded({ extended: false }))
app.use(cors);


// const LessonRoute = require('./routes/Lesson');
// app.use('/Lesson', LessonRoute);

app.get('/hello', (req, res) => {
    res.send("Hello")
})


db.sequelize.sync({ force: false }).then(() => {

    app.listen(8000, () => {
        console.log("Server is running in port 8000")
    })

})


