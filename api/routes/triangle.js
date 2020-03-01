const express = require('express');
const router = express.Router();

// localhost:3000/triangle/?a=3&b=4&c=5
router.get('/', (req, res, next) => {
    if ((req.query.a === '') || (req.query.b === '') || (req.query.c === '')) res.send('Incorrect');
    else {
        const a = req.query.a;
        const b = req.query.b;
        const c = req.query.c;
        if ((a !== b) && (a !== c) && (b !== c)) res.send('Scalene');
        else if ((a === b) && (a === c) && (b === c)) res.send('Equilateral');
        else if ((a === b) || (a === c) || (b === c)) res.send('Isosceles');
        console.log(a, b, c);
    }
});

module.exports = router;