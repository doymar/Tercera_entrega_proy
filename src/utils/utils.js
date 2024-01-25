import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
const SECRET_KEY_JWT = config.secret_jwt;

export const __dirname = join(dirname(fileURLToPath(import.meta.url)), "..");

export const hashData = async(data)=>{
    return bcrypt.hash(data,10);
};

export const compareData = async(data,hashedData)=>{
    return bcrypt.compare(data,hashedData);
};

export const generateToken = (user) => {
    const token = jwt.sign(user, SECRET_KEY_JWT, {expiresIn: 300});
    return token;
}