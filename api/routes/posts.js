const express = require('express');
const router = express.Router();
//const multer = require('multer');
const path = require('path');
const connection = require('../../config/database');

/*const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname);
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const upload = multer({storage: storage});*/

// List of comments
router.get('/', (req, res, next) => {
    connection.query("SELECT * FROM post", (err, rows, fields) => {
        res.status(200).json(rows);
    });
});


// Create a new comment
router.post('/', (req, res, next) => {
    //console.log(req.file);
    const post = {
        'title': req.body.title,
        'content': req.body.content,
        'image': req.body.image
    };
    
    for(i in post) {
        if(post[i] === undefined) {
            res.status(404).send('The post cannot be created');
            return;
        }
    }

    connection.query("INSERT INTO post SET ?", post, (err, rows, fields) => {
        if(err) throw err;
        res.status(201).json({
            message: 'Post created'
        });
    });
    
});


// Update a product
router.put('/:postId', (req, res, next) => {
    const id = req.params.postId;
    const post = {
        'title': req.body.title,
        'content': req.body.content,
        'image': req.body.image
    };
    const values = Object.keys(post).map(k => k = post[k]);
    connection.query("UPDATE post SET ? WHERE id = ?", [post, id], (err, rows, fields) => {
        if(rows['affectedRows'] == 0) return res.status(404).send('The post does not exist');
        res.status(200).json({
            message: 'Post updated'
        });
    });
});


// Delete a product
router.delete('/:postId', (req, res, next) => {
    const id = req.params.postId;
    connection.query("DELETE FROM post WHERE id = ?", [id], (err, rows, fields) => {
        if(rows['affectedRows'] == 0) return res.status(404).send('The post does not exist');
        res.status(200).json({
            message: 'Post deleted'
        });
    });
});


// View a product
router.get('/:postId', (req, res, next) => {
    const id = req.params.postId;
    connection.query("SELECT * FROM post WHERE id = ?", [id], (err, rows, fields) => {
        if(Array.isArray(rows) && rows.length === 0) res.status(404).send('The post does not exist');
        else res.status(200).json(rows);
        /*const posts = rows.map((row) => {
            return {
                title: row.title,
                content: row.content
            }
        });
        res.json(posts);*/
    });
});

module.exports = router;