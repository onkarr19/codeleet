import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({message: "Missing Auth Header"});

    const decoded = jwt.verify(authHeader, JWT_SECRET);
    if (decoded && decoded.id) {
        req.userId = decoded.id;
        next();
    } 
    else return res.status(403).json({message: "Incorrect Token"});
};