 const express = require('express');
 const app = express();
 const bodyParser = require('body-parser');
 const cors = require('cors')
 const db = require('./models')

 app.use(bodyParser.json);
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(cors);



 db.sequelize.sync().then(()=>{

     app.listen(8000,()=>{
         console.log("Server is running in port 8000")
     })

 })

