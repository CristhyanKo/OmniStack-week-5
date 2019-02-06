const express = require('express')
const TweetController = require('./constrollers/TweetController')
const LikeController = require('./constrollers/LikeController')

const routes = express.Router()

routes.get('/tweets', TweetController.index)
routes.post('/tweets', TweetController.store)
routes.post('/like/:id', LikeController.store)

module.exports = routes