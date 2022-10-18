const axios = require('axios');
const baseURL = 'http://localhost:' + process.env.PORT + '/api/';

exports.homeRoutes = (req, res) => {

    // make a get request to api/users
    console.log('baseURL', baseURL);

    axios.get(baseURL + 'emoji')
        .then(function (response) {
            res.render('index', { emojies: response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.add_emoji = (req, res) => {
    res.render('add_emoji');
}

exports.update_emoji = (req, res) => {
    axios.get(baseURL + 'emoji', { params: { id: req.query.id } })
        .then(function (response) {
            res.render('update_emoji', { emoji: response.data });
        })
        .catch(err => {
            res.send(err);
        })

}    