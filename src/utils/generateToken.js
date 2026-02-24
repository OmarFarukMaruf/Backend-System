// to use a random as secret key, we can use this command: openssl rand -base64 32, to create a 32-byte random string, which is suitable for use as a secret key in JWT.

import jwt from "jsonwebtoken";
import 'dotenv/config';

 export const generateToken = (userId, res) => {
    const payload = { id: userId };
    const token = jwt.sign(payload, process.env.JWT_SICKRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });
    return token;
};

