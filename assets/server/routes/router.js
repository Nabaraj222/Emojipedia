const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/', services.homeRoutes);

route.get('/add-emoji', services.add_emoji);

route.get('/update-emoji', services.update_emoji);

route.get('/api/test', (req, res) => res.json({ msg: "Hi from server." }));
route.post('/api/emoji', controller.create);
route.get('/api/emoji', controller.find);
route.put('/api/emoji/:id', controller.update);
route.delete('/api/emoji/:id', controller.delete);

module.exports = route;