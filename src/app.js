const express = require('express')
const app = express()
const router = require('./routers')
const body = require('body-parser')

app.use(body.json())
app.use(router)

module.exports = app