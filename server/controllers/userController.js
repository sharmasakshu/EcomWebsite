const User =require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const {validationResult} =require('express-validator')

dotenv.config();

//This function register the user after checking its availability in database. If its available then it will send the error to frontend .
//If its not then it will hash the password of the user and generate a new token and send it to frontend after saving it in database

const registerUser = async (req, res) => {
    try {
        const errors =validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({ error: errors.errors[0].msg })
        }      
        const data = req.body;
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(data.password, salt)
        const newUser = await new User({
            username: data.username,
            email: data.email,
            password: hashedPassword,
        }).save();
        // pass user id as pyload and secret Key and expiry
        const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        })
        res.status(201).json({
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token,
        })
    } catch (error) {
        console.log("error")
        res.status(500).json({ error: error.message })
    }
}
const loginUser = async (req, res) => {
    try {
        const errors =validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({ error: errors.errors[0].msg})
        }
        const data = req.body;
        const existingUser = await User.findOne({ email: data.email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }
        const matchedPassword = await bcrypt.compare(data.password, existingUser.password);
        if (!matchedPassword) {
            return res.status(401).json({ message: "Password does not match" })
        }
        const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        })
        res.status(200).json({
            username: existingUser.username,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin,
            token,
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAllUser = async (req, res) => {
    try {
        const allUsers = await User.find()
        if(allUsers.length === 0){
            return  res.status(404).json({message : "No users found"})
        }
        res.status(200).json(allUsers)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateAdmin = async (req, res) => {
    try {
        const {_id} = req.params;
        let token = req.headers.authorization.split(" ")[1]
        let {_id : userId} = jwt.verify(token, process.env.JWT_SECRET)
        if(_id === userId ){
            return res.status(403).json({message : 'User cannot update their own role'})
        }
        let existingUser = await User.findById(_id);
        if(!existingUser){
            return res.status(404).json({message : 'User not found'})
        }
        
        const updatedUser = await User.findByIdAndUpdate({_id}, {
            isAdmin : existingUser.isAdmin ? false : true,
        }, {new : true}) 

        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const deleteUser = async (req, res) => {
    try {
        const {_id} = req.params;
        let token = req.headers.authorization.split(" ")[1]
        let {_id : userId} = jwt.verify(token, process.env.JWT_SECRET)
        if(_id === userId ){
            return res.status(403).json({message : 'User cannot delete themself'})
        }
        let existingUser = await User.findById(_id);
        if(!existingUser){
            return res.status(404).json({message : 'User not found'})
        }
        const deletedUser = await User.findByIdAndDelete(_id)
        res.status(200).json(deletedUser)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = { registerUser, loginUser ,getAllUser ,updateAdmin, deleteUser}