import jwt from 'jsonwebtoken';
const JWT_SECRET = "SECRET_KEY";

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