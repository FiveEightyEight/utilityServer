const app = require('express')();
const math = require('./math');
const giphy = require('./giphy');
const port = 800;

app.get('/', (req, res) => {
    console.log(`get @ '/' is being called`);

    res.json({
        'message': 'at base',
    });

});

app.get('/math', (req, res) => {

    res.json({
        'message': 'at base math',
    });

});

app.get('/math/add', (req, res) => {

    let keys = Object.keys(req.query);
    const add = {};
    const nan = {};
    let sum = 0;
    let sumString = '';
    for (let i = 0; i < keys.length; i++) {
        const currentVal = req.query[keys[i]];
        if (math.coerce(currentVal)) {
            add[keys[i]] = math.coerce(currentVal);
        } else {
            nan[keys[i]] = currentVal;
        }
    }

    keys = Object.keys(add);

    for (let i = 0; i < keys.length; i++) {
        sum = math.add(add[keys[i]], sum);

        sumString += `${add[keys[i]]}`;

        if ((i + 1) !== keys.length) {
            sumString += ' + ';
        }
    }

    res.json({
        'Valid Input': add,
        'Invalid Input': nan,
        sumString,
        sum,
    });

});

app.get('/math/subtract', (req, res) => {

    let keys = Object.keys(req.query);
    const sub = {};
    const nan = {};
    let difference = 0;
    let differenceString = '';
    for (let i = 0; i < keys.length; i++) {
        const currentVal = req.query[keys[i]];
        if (math.coerce(currentVal)) {
            sub[keys[i]] = math.coerce(currentVal);
        } else {
            nan[keys[i]] = currentVal;
        }
    }

    keys = Object.keys(sub);

    for (let i = 0; i < keys.length; i++) {
        difference = math.subtract(sub[keys[i]], difference);

        differenceString += `${sub[keys[i]]}`;

        if ((i + 1) !== keys.length) {
            differenceString += ' - ';
        }
    }

    res.json({
        'Valid Input': sub,
        'Invalid Input': nan,
        differenceString,
        difference,
    });

});


app.get('/math/multiply', (req, res) => {

    let keys = Object.keys(req.query);
    const mul = {};
    const nan = {};
    let product = 1;
    let prodString = '';
    for (let i = 0; i < keys.length; i++) {
        const currentVal = req.query[keys[i]];
        if (math.coerce(currentVal)) {
            mul[keys[i]] = math.coerce(currentVal);
        } else {
            nan[keys[i]] = currentVal;
        }
    }

    keys = Object.keys(mul);

    for (let i = 0; i < keys.length; i++) {
        product = math.multiply(mul[keys[i]], product);

        prodString += `${mul[keys[i]]}`;

        if ((i + 1) !== keys.length) {
            prodString += ' * ';
        }
    }

    res.json({
        'Valid Input': mul,
        'Invalid Input': nan,
        prodString,
        product,
    });

});

app.get('/math/divide', (req, res) => {

    let keys = Object.keys(req.query);
    const div = {};
    const nan = {};
    let quotient = 1;
    let divString = '';
    for (let i = 0; i < keys.length; i++) {
        const currentVal = req.query[keys[i]];
        if (math.coerce(currentVal)) {
            div[keys[i]] = math.coerce(currentVal);
        } else {
            nan[keys[i]] = currentVal;
        }
    }

    keys = Object.keys(div);

    for (let i = 0; i < keys.length; i++) {
        quotient = math.divide(div[keys[i]], quotient);

        divString += `${div[keys[i]]}`;

        if ((i + 1) !== keys.length) {
            divString += ' / ';
        }
    }

    res.json({
        'Valid Input': div,
        'Invalid Input': nan,
        divString,
        quotient,
    });

});

app.get('/gif', (req, res) => {
    console.log(`get gif is being called`);

    const search = req.query.search;

    if (search) {

        giphy.getGif(search, cb => {
            res.json(cb);

        });
    } else {
        res.json({

            'message': `cannot search '${search}'`,

        });

    }

});


app.listen(port, (e) => {
    console.log(`Listening on port ${port}`)
});