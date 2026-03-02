import { prisma } from '../config/db.js';
// to insatll bcrypt, run: npm install bcryptjs
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
import e from 'express';

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // check if the user already exists in the database
    const userExists = await prisma.user.findUnique({
        where: { email: email }
    });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save the user to the database
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const token = generateToken(newUser.id, res);

    res.status(201).json({
        status: "success", data: {
            user: {
                id: newUser.id,
                name: name,
                email: email
            },
            token
        }
    });
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    // check if the user exists in the database
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token - to install jsonwebtoken, run: npm install jsonwebtoken
    const token = generateToken(user.id, res);


    res.status(200).json({
        status: "success", data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        }
    });
};

// logout
const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully"
    });
};

export { register, login, logout };