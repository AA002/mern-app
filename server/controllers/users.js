const User = require('../models/User');
const to = require('await-to-js').default;

exports.get = (req, res) => {
    if(req.params.id){
        User.findById(req.params.id, (err, user) => {
            if(err)
                return res.status(400).json(err);
            if(!user)
                return res.status(404).json(`No user with the id: ${req.params.id} was found!`)
            res.status(200).json(user);
        })
     } else {
        User.find({}, (err, users) => err ? res.status(400).json(err) : res.status(200).json(users));
     }
};

exports.post = (req, res) => {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    user.save(err => err ? res.status(400).json(err) : res.status(200).json("User created!"));
};

exports.delete = (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, user) => {
        if(err)
            return console.error(err);
        if(!user)
            return res.status(404).json(`No user with the id: ${req.params.id} was found!`)
        res.status(200).json(`User ${user._id} was sucessfully deleted!`);
    })
};

exports.patch = async (req, res) => {
    [err, user] = await to(User.findById(req.params.id));
    if(err)
        console.error(err);
    if(!user)
        return res.status(404).json(`No user with the id: ${req.params.id} was found!`);
    
    res.status(200).json(user)
};