const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const postsRoutes = require('./api/routes/posts');
const commentsRoutes = require('./api/routes/comments');
const triangleRoutes = require('./api/routes/triangle');

//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Routes
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);
app.use('/triangle', triangleRoutes);


// Error handle
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Error handle
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});





module.exports = app;