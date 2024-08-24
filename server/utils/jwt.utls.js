import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const createToken = (id) => {
    return jwt.sign(
                    {id},
                    process.env.JWT_SECRET_KEY, 
                    {expiresIn: '1h'}
                )
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return reject(err)
            }
            resolve(decoded)
        })
    })
}

export default {createToken, verifyToken}