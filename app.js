const express = require('express')
require('./config/mongoose') 
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

const ShortenUrl = require('./models/shortenUrl')
const { findOne } = require('./models/shortenUrl')

app.engine('handlebars',exphbs ({ defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shortenURL', (req, res) => {
  const inputURL = req.body.inputURL

  if(!inputURL){
    let error = '請輸入網址'
    return res.render('index', {inputURL , error}  )
  } else{
      let shortenURL =''
      shortenURL = randomShortenURL(Math.floor(Math.random()*5)+5 )
    return ShortenUrl.create({originalUrl:inputURL , shortenUrl:shortenURL})
    .then(() => res.render('index', {inputURL , shortenURL}))
    .catch(error => console.log(error))
  }      
})

app.get('/:shortenUrl', (req, res) =>{
  const shortenUrl = req.params.shortenUrl
  return ShortenUrl.findOne({shortenUrl})
  .then(shortenUrl => {
    if (!shortenUrl) {
      console.log('do not find')
      res.redirect('/')
    }
    else {
      console.log(shortenUrl.originalUrl)
      res.redirect(shortenUrl.originalUrl)
    }
  })
  .catch(error => console.log(error))
})

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})

function randomShortenURL(length) {
  let randomURL = ''
  let randomChar = () => { 
    let n = Math.floor(Math.random()*62) 
    if(n<10) return n;   //1-10 
    if(n<36) return String.fromCharCode(n+55);   //A-Z
    return String.fromCharCode(n+61); //a-z
  }
  while( randomURL.length < length ) { randomURL += randomChar() }
  return randomURL
}

