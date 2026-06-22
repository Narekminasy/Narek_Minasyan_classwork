import {Router} from 'express';
import auth from "../middlewares/authorization.js";
import validation from "../middlewares/validation.js";
import schema from "../middlewares/schemas/users.schema.js";
import { controller } from "../controllers/users.js";


const router = new Router();


router.get("/home", auth, (req, res) => {
    res.send("home.ejs");
});

router.get('/register', (req, res) => {
    res.render('register.ejs');
});

router.post(
    '/register',
    validation(schema.register, 'body'),
    controller.register
);

router.get('/login', (req, res) => {
    res.render('login.ejs');
});
router.post(
    '/login',
    validation(schema.login, 'body'),
    controller.login
);

export default router;