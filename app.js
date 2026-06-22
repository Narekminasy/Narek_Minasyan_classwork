import path from 'path';
import express from 'express';
import 'dotenv/config';
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// views configuration
app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));

// router
app.use(router);

//errror
app.use(errorHandler.notFound);
app.use(errorHandler.errors);


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
