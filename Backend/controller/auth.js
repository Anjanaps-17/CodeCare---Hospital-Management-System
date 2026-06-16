const { User } = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res, next) => {
    const { username, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            username,
            password: hashedPassword,
            role
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });

    } catch (err) {
        next({ code: 500, message: err.message });
    }
};

// LOGIN
const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid Username"
            });
        }

        const isValidPassword = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                userId: existingUser._id,
                username: existingUser.username,
                role: existingUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        res.status(200).json({
            success: true,
            token,
            username: existingUser.username,
            role: existingUser.role
        });

    } catch (err) {
        next({ code: 500, message: err.message });
    }
};

exports.register = register;
exports.login = login;