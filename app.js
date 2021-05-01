const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Music = require('./models/music')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');



var port = 5000;  
dotenv.config();

app.use(bodyParser.json()); 


const musicsRouter = require('./routes/musics') 
const methodOverride = require('method-override')

app.set('view engine', 'ejs')  
app.use(express.urlencoded({ extended: false})) 
app.use(methodOverride('_omethod'))
app.use(express.static('views/music')) 


app.get('/', async  (req,res)=> {
   const musics = await Music.find();  

    res.render('music/index' , {musics: musics})
})                                         

const dbURI = process.env.DB_URL;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true })
        .then((result) => console.log('connected to db'))
        .catch((err) => console.log(err));

app.use('/musics', musicsRouter) // 

//app.listen(5000, () => console.log('Server Started'))

app.listen(port, function(error){
    console.log('Server Started on port: ' + port);
});