import HttpErrors from "http-errors";
import moment from "moment";
import jwt from 'jsonwebtoken';

const {
    PASSWORD_SECRET,
    TOKEN_SECRET,
} = process.env;

import {
    findById,
    create,
    update,
    hashPassword,
    checkEmailUnique,
    findByEmail,
    encrypt,
    decrypt,
} from '../controllers/authController.js';


export const controller = {
    async profile(req, res, next) {
        try {
            res.json({ message: "Welcome to your profile" });
        } catch (e) {
            next(e);
        }
    },

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await findByEmail(email);
            if(!user || user.password !== hashPassword(password)) {
                return next(HttpErrors(401, "Invalid email or password"));
            }
            const token = jwt.sign({
                userId: user.id,
            },TOKEN_SECRET,{expiresIn: '24h'});

            res.cookie('usertoken', token, {
                httpOnly: true,
                signed: true,
                path: '/',
                maxAge: 1000 * 60 * 60 * 24
            });


            const userResponse = { ...user };
            delete userResponse.password;

            res.json({
                token,
                user: userResponse,
            });
        } catch (e) {
            next(e);
        }
    },
    async register(req, res, next) {
        try {
            const {name ,email, password,age} = req.body;

            if(await checkEmailUnique(email)) {
                return next(HttpErrors(422, "Email is already in use!"));
            }

            const user = await create({
                name,
                email,
                password: hashPassword(password),
                age,
            })

            const userResponse = { ...user };
            delete userResponse.password;

            res.json({
                message:"Successfully registered",
                user: userResponse,
            });
        } catch (e) {
            next(e);
        }
    },
    async logout(req, res, next) {
        try {
            res.clearCookie('usertoken',{path: '/'});
            return res.json({ssuccess: true, message: "Logged out successfully"});
        }catch (e){
            next(e);
        }
    }
};
