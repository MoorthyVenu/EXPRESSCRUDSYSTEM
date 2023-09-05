const axios=  require('axios')


exports . homeRoute=(req,res)=>{

    axios.get('http://localhost:3000/api/users')
    .then((response) => {
        console.log(response.data);
        res.render('index', { users: response.data.user});
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error fetching data from the API');
    });
}

exports . addUserRoute=(req,res)=>{
    res.render("add_user.ejs");
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}




