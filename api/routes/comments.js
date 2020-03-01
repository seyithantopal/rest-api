const express = require('express');
const router = express.Router();
const connection = require('../../config/database');


// List of comments
router.get('/', (req, res, next) => {
    connection.query("SELECT * FROM comment", (err, rows, fields) => {
        res.status(200).json(rows);
    });
});


// Create a new comment
router.post('/', (req, res, next) => {
    const comment = {
        'post_id': req.body.post_id,
        'comment': req.body.comment,
        'date': new Date().toJSON().slice(0,10).replace(/-/g,'/')
    };

    for(i in comment) {
        if(comment[i] === undefined) {
            res.status(404).send('The comment cannot be created');
            return;
        }
    }
    connection.query("INSERT INTO comment SET ?", comment, (err, rows, fields) => {
        if (err) throw err;
        res.status(201).json({
            message: 'Comment created'
        });
    });
});


// Update a product
router.put('/:commentId', (req, res, next) => {
    const id = req.params.commentId;
    const comment = {
        'post_id': req.body.post_id,
        'comment': req.body.comment,
        'date': new Date().toJSON().slice(0,10).replace(/-/g,'/')
    };
    connection.query("UPDATE comment SET ? WHERE id = ?", [comment, id], (err, rows, fields) => {
        if(rows['affectedRows'] == 0) return res.status(404).send('The comment does not exist');
        res.status(200).json({
            message: 'Comment updated'
        });
    });
});


// Delete a product
router.delete('/:commentId', (req, res, next) => {
    const id = req.params.commentId;
    connection.query("DELETE FROM comment WHERE id = ?", [id], (err, rows, fields) => {
        if(rows['affectedRows'] == 0) return res.status(404).send('The comment does not exist');
        res.status(200).json({
            message: 'Comment deleted'
        });
    });
});


// View a product
router.get('/:commentId', (req, res, next) => {
    const id = req.params.commentId;
    connection.query("SELECT * FROM comment WHERE id = ?", [id], (err, rows, fields) => {
        if(Array.isArray(rows) && rows.length === 0) res.status(404).send('The comment does not exist');
        else res.status(200).send(rows);
    });
});

module.exports = router;