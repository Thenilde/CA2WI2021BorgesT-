const express = require('express') // getting the express package

const Music = require('../models/music') // getting the model
const router = express.Router()  // 

// difining the route carparts new and rendering the static page. And a form is used to pass the user input to the api.
router.get('/new', (req, res) => {
  res.render('music/new_music', { music: new Music() })// user input is passed to the database collection model.
})

router.get('/edit/:id', async (req, res) => {// defining new route to edit a car part.
  const music = await Music.findById(req.params.id) // passing the user selected id to the database collection and the document is found using 
  // id and render to the edit page all the user selected id's data.
  res.render('music/edit_music', { music: music })
})



router.get('/:id', async (req, res) => {// getting a car part details from database collection using id
  const music = await Music.findById()

  if (music == null) { // checking if part is null. if true sending a status code 404 and a error message.
 return res.status(404).json({message: 'Cannot find Instrument by id'})
  } 
  res.redirect('/')// redirect user to the homepage after the id is found
   
})

// creating new record.
// post is used to create a new record with the information submited in the user in the form.
router.post('/', async (req, res, next) => {
  req.music = new Music() // this is passed on to the database schema and new record is created.
  next() 

}, saveMusicAndRedirect('new')) // calling the function to create new record

// put is used to update a record in the collection
// a put request is sent using the document id to the database and the document 
router.put('/:id', async (req, res, next) => { 
  req.music = await Music.findById(req.params.id) // finding the document with the help of id request by user.
  next()

}, saveMusicAndRedirect('edit')) // calling the function to edit the document




//delete request is used to deleted a document
router.delete('/:id', async (req, res)=> {  // getting the document id from the user
    await Music.findByIdAndDelete(req.params.id)// finding the document and deleting the document from the collection
  res.redirect('/#instruments')// rediricting the user to products page.


})


function saveMusicAndRedirect(path) { // this function is used to pass all the user input to schema to create/ update
  return async (req, res) => {
    let music = req.music
    music.instrument = req.body.instrument
    music.price = req.body.price
    music.color = req.body.color
    music.year = req.body.year
    music.comments = req.body.comments
    try {
      music = await music.save() 

     res.redirect(`/#instruments`)
    } catch (e) {
 
 return res.status(400).json({message: 'Validation fail for the request'})
    }
  }    
}

module.exports = router