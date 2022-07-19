const router = require('express').Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "this is a json web token used for authorization";



//Creating a User: POST - no authentication is required
//No login required 
router.post('/createuser', [
    body('name').isLength({ min: 5 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be atleast of 8 characters").isLength({ min: 8 })
]
    , async (req, res) => {
        //if errors true returns 
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({success, errors: errors.array() });
        //checks whether the email is already present or not
        else {
            try {
                //checks whether email exist in Database
                let user = await User.findOne({ email: req.body.email });
                if (user)
                    return (res.status(400).json({success, error: "Sorry user with this email already exist. Please Login" }));
                //Creating automatic salt to add to pass
                const salt = await bcrypt.genSalt(10);
                let securedPass = await bcrypt.hash(req.body.password, salt);

                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: securedPass
                });

                //payload data
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(data, JWT_SECRET);
                success= true;
                res.json({success, authToken });

                // User.create({
                //     name: req.body.name,
                //     email: req.body.email,
                //     password: req.body.password
                // }).then(data => res.json(data))
                // .catch((err)=>res.status(400).json({"error" : "Please enter a unique email" , "message" :err.message}));
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Some Internal Error occurred");
            }
        }
    })


//Authenticate a user- login
router.post('/login', [
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password cannot be blank").exists()
]
    , async (req, res) => {
        //if errors true returns 
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        //checks whether the email is already present or not
        else {
            let success = false;
            const { email, password } = req.body;
            try {
                let user = await User.findOne({ email });
                if (!user)
                    return (res.status(400).json({success:success, "error": "Please Login with correct credentials" }));
                else {
                    const passCompare = await bcrypt.compare(password, user.password);

                    if (!passCompare)
                        return (res.status(400).json({success, error: "Please Login with correct credentials" }));

                    const payLoad = {
                        user: {
                            id: user.id
                        }
                    }

                    const authToken = jwt.sign(payLoad, JWT_SECRET);
                    success = true;
                    res.send({success, authToken });
                }
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Some Internal Error occurred");
            }
        }
    });

//Route-3 Getting user details og the loged in user

router.post('/getuser', fetchuser, async (req, res) => {
            try {
                let userId = req.user.id;
                const user = await User.findById(userId).select("-password");
                res.send(user);
            }
            catch (e) {
                console.log(e);
                res.status(500).send("Some Internal Error occurred");
            }
    });

module.exports = router;
