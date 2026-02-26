import jwt from 'jsonwebtoken';
    import { prisma } from '../config/db.js';

const authMiddleware = async (req, res, next) => {
    // read the token from the request header
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    // verify the token and extract the user ID
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // check if the user exists in the database
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(401).json({ message: "User not found, authorization denied" });
        }
        
        // attach the user ID to the request object for use in subsequent middleware or route handlers
        req.userId = userId;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: "Invalid token, authorization denied" });
    }
};

export default authMiddleware;