import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const getToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '1h',
        }
    );
};

export { getToken };