const express = require('express');

const Users = require('./userModel');

const router = express.Router();

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ message: 'Congrats you are not stupid', users })
        })
        .catch(err => {
            res.status(500).json({ Message: 'You dun messed up!' })
        });
});

router.post('/', (req, res) => {
    const userInfo = req.body;
    Users.find()
        .then(user => {
            if (!req.body.username) {
                res.status(400).json({ Message: "Missing required fields" })
            } else {
                Users.add(userInfo)
                    .then(user => {
                        res.status(201).json({ Message: "New User Created" })
                    })
                    .catch(err => {
                        res.status(500).json({ Message: "User failed to be created" })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ Message: "There was a glitch in the matrix." })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    Users.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({ removed: deleted });
            } else {
                res.status(404).json({ Message: "Dummy you borked it" });
            }
        })
        .catch(err => {
            res.status(500).json({ Message: 'You stupid it did not delete' })
        })
})

module.exports = router;