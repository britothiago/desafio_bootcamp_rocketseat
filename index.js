const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const checkAgeMiddleware = (req, res, next) => {
  if (req.query.age) {
    return next()
  }
  return res.redirect('/')
}

app.get('/', (req, res) => {
  return res.render('age')
})
app.post('/check', (req, res) => {
  const ageUser = req.body.age
  if (ageUser >= 18) {
    return res.redirect('/major?age=' + ageUser)
  } else {
    return res.redirect('/minor?age=' + ageUser)
  }
})
app.get('/major', checkAgeMiddleware, (req, res) => {
  const age = req.query.age
  return res.render('major', { age })
})
app.get('/minor', checkAgeMiddleware, (req, res) => {
  const age = req.query.age
  return res.render('minor', { age })
})

app.listen(5000)
