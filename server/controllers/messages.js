const Message = require('../models/Message');

exports.get = (req, res) => {
    Message.find({}, (err, Messages) => err ? console.log(err) : res.json(Messages));
};

exports.post = (req, res) => {
    var Message = new Message({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    Message.save(err => console.log(err))
};