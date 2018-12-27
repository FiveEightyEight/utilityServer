const app = require('express')();
const math = require('./math');
const giphy = require('./giphy');
const port = 3000;

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

    if (keys.length >= 2) {

        for (let i = 0; i < keys.length; i++) {
            sum = math.add(add[keys[i]], sum);

            sumString += `${add[keys[i]]}`;

            if ((i + 1) !== keys.length) {
                sumString += ' + ';
            }
        }

        keys = Object.keys(nan);
        if (keys.length > 0) {
            res.json({
                'valid input': add,
                'invalid input': nan,
                sumString,
                sum,
            });
        } else {
            res.json({
                'input': add,
                sumString,
                sum,
            });
        }


    } else if (keys.length < 2 && (Object.keys(nan).length === 0)) {
        res.json({
            error: 'You must enter at least 2 valid inputs.'
        });
    } else {
        res.json({
            error: 'You passed a non-number value into the parameters.'
        });
    }

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

    if (keys.length >= 2) {

        for (let i = 0; i < keys.length; i++) {
            difference = math.subtract(sub[keys[i]], difference);

            differenceString += `${sub[keys[i]]}`;

            if ((i + 1) !== keys.length) {
                differenceString += ' - ';
            }
        }

        keys = Object.keys(nan);
        if (keys.length > 0) {
            res.json({
                'valid input': sub,
                'invalid input': nan,
                differenceString,
                difference,
            });
        } else {
            res.json({
                'input': sub,
                differenceString,
                difference,
            });
        }


    } else if (keys.length < 2 && (Object.keys(nan).length === 0)) {
        res.json({
            error: 'You must enter at least 2 valid inputs.'
        });
    } else {
        res.json({
            error: 'You passed a non-number value into the parameters.'
        });
    }

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

    if (keys.length >= 2) {

        for (let i = 0; i < keys.length; i++) {
            product = math.multiply(mul[keys[i]], product);

            prodString += `${mul[keys[i]]}`;

            if ((i + 1) !== keys.length) {
                prodString += ' * ';
            }
        }

        keys = Object.keys(nan);
        if (keys.length > 0) {
            res.json({
                'valid input': mul,
                'invalid input': nan,
                prodString,
                product,
            });
        } else {
            res.json({
                'input': mul,
                prodString,
                product,
            });
        }
       
    } else if (keys.length < 2 && (Object.keys(nan).length === 0)) {
        res.json({
            error: 'You must enter at least 2 valid inputs.'
        });
    } else {
        res.json({
            error: 'You passed a non-number value into the parameters.'
        });
    }



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

    if (keys.length >= 2) {

        for (let i = 0; i < keys.length; i++) {
            quotient = math.divide(div[keys[i]], quotient);

            divString += `${div[keys[i]]}`;

            if ((i + 1) !== keys.length) {
                divString += ' / ';
            }
        }

        keys = Object.keys(nan);
        if (keys.length > 0) {
            res.json({
                'valid input': div,
                'invalid input': nan,
                divString,
                quotient,
            });
        } else {
            res.json({
                'input': div,
                divString,
                quotient,
            });
        }

     

    } else if (keys.length < 2 && (Object.keys(nan).length === 0)) {
        res.json({
            error: 'You must enter at least 2 valid inputs.'
        });
    } else {
        res.json({
            error: 'You passed a non-number value into the parameters.'
        });
    }

});

app.get('/gif', (req, res) => {
    console.log(`get gif was called`);

    const {
        search,
        num
    } = req.query;

    if (search) {

        giphy.getGif(search, num, cb => {
            const imgUrl = [];
            if (num >= 2) {
                for (let i = 0; i < cb.data.length; i++) {
                    imgUrl.push(cb.data[i].images.original.url);
                }
            } else {
                imgUrl.push(cb.data[0].images.original.url);
            }

            res.json(
                imgUrl
            );

        });
    } else if (search === undefined) {

        res.json({

            'message': `enter a search argument using the parameter (search=) and the quantity you want returned (num=)'`,

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