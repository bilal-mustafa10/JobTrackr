import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            verifiedEmail,
            universityYear,
            universityName
        } = req.body;

        const salt = await bcrypt.genSalt(); // used to encrypt password
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            emailAddress,
            password: passwordHash,
            verifiedEmail,
            universityName,
            universityYear
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};


/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const {emailAddress, password} = req.body;
        const user = await User.findOne({emailAddress: emailAddress})

        if (!user) return res.status(400).json({msg: "User does not exist"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials. "});


        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        user.password = null;
        res.status(200).json({token, user});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
