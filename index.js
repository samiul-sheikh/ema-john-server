const express = require('express')
const app = express()
const port = 8080;

app.get('/', (req, res) => {
    res.send('welcome to ema-john server!')
})

app.listen(port)