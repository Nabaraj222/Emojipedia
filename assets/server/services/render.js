const axios = require('axios');
const baseURL = 'http://localhost:'+ process.env.PORT + '/api/';

exports.homeRoutes = (req, res)=>{

    // make a get request to api/users
console.log('baseURL', baseURL);

axios.get(baseURL+'users')
.then(function(response){
    
    res.render('index', {users: response.data});
})
.catch(err =>{
    res.send(err);
})
}    

exports.add_user = (req, res)=>{
    res.render('add_user');
}    

exports.update_user = (req, res)=>{
    res.render('update_user');
}    