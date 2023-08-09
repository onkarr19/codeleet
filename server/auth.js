import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// custom middleware function for authentication
export const auth = (req, res, next) => {
    
    // get the 'Authorization' header from the request headers
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        // ff the 'Authorization' header is missing, return a 403 (Forbidden) response
        return res.status(403).json({ message: "Missing Auth Header" });
    }

    try {
        // verify the JWT token using the JWT_SECRET
        const decoded = jwt.verify(authHeader, JWT_SECRET);

        if (decoded && decoded.id) {
        // if the token is valid and contains a user ID, store the user ID in the request object for later use
        req.userId = decoded.id;

        // proceed to the next middleware or route handler
        next();
        } else {
        // If the token is invalid or doesn't contain a user ID, return a 403 (Forbidden) response
        return res.status(403).json({ message: "Incorrect Token" });
        }
    } catch (err) {
        // If there's an error while verifying the token, return a 403 (Forbidden) response
        return res.status(403).json({ message: "Invalid Token" });
    }
};
