const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.js");
const UserLogin = express.Router();

UserLogin.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const user = await UserModel.findOne({ username });
        if (user) {
           
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.send("Welcome");
            } else {
                res.send("Wrong password");
            }
        } else {
            res.send("User not found");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = UserLogin
