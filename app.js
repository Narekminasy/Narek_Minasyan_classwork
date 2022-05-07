import path from 'path';
import cookieParser from 'cookie-parser';
import express from 'express';
import 'dotenv/config';
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import runMigration from './migrate.js'
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

runMigration();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser('secret'));

// views configuration
app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));
app.use(morgan('dev'));

// router
app.use(router);

//errror
app.use(errorHandler.notFound);
app.use(errorHandler.errors);


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
