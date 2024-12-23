const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Express working')
})

app.listen(3000, () => {
  console.log('servidor rodando')
})
