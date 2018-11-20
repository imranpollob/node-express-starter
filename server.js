const express = require('express');
const hbs = require('hbs');
const fs =require('fs')

var app = express();

app.set('view engine', 'hbs')

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now} - ${req.method} ${req.url}`
  fs.appendFileSync('server.log', log + '\n')
  console.log(log)

  next()
})

app.use((req, res, next) => {
  res.render('maintenence')
})

app.use(express.static(__dirname + '/public'))

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getYear', () => new Date().getFullYear())
hbs.registerHelper('capitalize', (text) => text.toUpperCase())

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    name: 'Imran Pollob'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Imran Pollob'
  })
});

app.listen(5000, () => {
  console.log('Server is starting...')
}); 