import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const createToken = (username) => {
    return jwt.sign({username},
                    process.env.JWT_SECRET_KEY, 
                    {expiresIn: '1m'})
}

export default {createToken}