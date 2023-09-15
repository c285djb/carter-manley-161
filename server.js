import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';

const app = express();

connectDatabase();

app.use(express.json({ extended: false}));

app.get('/', (req, res) =>
    res.send('http get request sent to root api endpont')
);

app.post(
    '/api/users',
    [
        check('name', 'Please enter your name')
            .not()
            .isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min : 6 })
    ], 
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        } else {
            return res.send(req.body);
        }
    }
);

app.listen(4000, () => console.log ('Express server running on port 4000'));