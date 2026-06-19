import {Router} from 'express';
import auth from "../middlewares/authorization.js";
import validation from "../middlewares/validation.js";
import schema from "../middleware/schemas/users.schema.js";

const router = new Router();

router().get('/login', (req, res) => {
    res.render('login.ejs');
});
router().post(
    '/login',
    validation(schema.login, 'body'),
    controller.login
);

export default router;