const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

// setting routing
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(item =>
    item.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurants: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurant = restaurantList.results.filter(item =>
    item.name.toLowerCase().includes(keyword) || item.category.includes(keyword)
  )
  res.render('index', { restaurants: restaurant, keyword: keyword })
})

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})

// require express-handlebars here
const useHandlebars = require('express-handlebars')

// setting template engine
app.engine('handlebars', useHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))