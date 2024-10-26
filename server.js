// Import express
const express = require('express')

// Invoke express app
const app = express()

//Exercise 1
app.get('/greetings/:username', (req, res) => {
  const username = req.params.username
  res.send(
    `Hello there, ${username}! What a delight it is to see you once more, ${username}.`
  )
})

app.listen(4000, () => {
  console.log('Listening on port 4000')
})

//Exercise 2

app.get('/roll/:number', (req, res) => {
  const maxNumber = req.params.number

  if (isNaN(maxNumber)) {
    return res.send('You must specify a number.')
  }

  const rolledNumber = Math.floor(Math.random() * (maxNumber + 1))

  res.send(`You rolled a ${rolledNumber}.`)
})

//Exercise 3

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index, 10)

  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send('This item is not yet in stock. Check back soon!')
  }

  const item = collectibles[index]
  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
})

//Exercise 4
const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
]

app.get('/shoes', (req, res) => {
  let filteredShoes = shoes

  if (req.query['min-price']) {
    const minPrice = parseFloat(req.query['min-price'])
    filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice)
  }

  if (req.query['max-price']) {
    const maxPrice = parseFloat(req.query['max-price'])
    filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice)
  }

  if (req.query['type']) {
    const type = req.query['type']
    filteredShoes = filteredShoes.filter((shoe) => shoe.type === type)
  }

  res.send(filteredShoes.length > 0 ? filteredShoes : 'No shoes found.')
})
