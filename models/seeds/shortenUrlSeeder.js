const db = require('../../config/mongoose')
const ShortenUrl = require('../ShortenUrl')

db.once('open', () => {
  ShortenUrl.create({
    originalUrl : "https://www.google.com/",
    shortenUrl : "google"
}).then(()=>{
  console.log('Seeder done!')
  return db.close()
})
})