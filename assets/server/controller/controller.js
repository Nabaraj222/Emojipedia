const { response } = require('express');
const emojiDb = require('../model/model');

// save a new emoji
exports.create = async (req, res) => {

    // validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty' });
        return;
    }

    //new emoji
    const emoji = new emojiDb({
        name: req.body.name,
        description: req.body.description,
        utf8: req.body.utf8,
        status: req.body.status
    })

    // save to database 
    try {
        const response = await emoji.save()
            .then(data => {
                res.redirect("/");
            });
    }
    catch (err) {
        return res.status(500).json({ message: err || 'error while saving data...' })
    }
}

// retrive emojies
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        emojiDb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "data not found." })
                }
                else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error occurred while retrieving data with id: " + id });
            })
    }
    else {
        emojiDb.find()
            .then(emoji => {
                res.send(emoji);
            })
            .catch(err => {
                return res.status(500).send({ message: err || 'error while finding emoji...' })
            })
    }
}

// update emoji
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'data cannot be empty.' })
    }
    const id = req.params.id;
    emojiDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "can not update data with " + id + " not found." })
            }
            else {
                res.send(data)
            }
        })
        .catch(err => {
            return res.status(500).send({ message: err || 'error while updating data...' })
        })
}

// delete emoji
exports.delete = (req, res) => {
    const id = req.params.id;

    emojiDb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "can not delete data with " + id + " not found." })
            }
            else {
                res.send({ message: "data is deleted successfully." })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "error occurred while deleting data." });
        });
}