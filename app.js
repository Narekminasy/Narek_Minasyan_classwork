import express from 'express';
import 'dotenv/config';
import router from "./routes/index.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(router);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));