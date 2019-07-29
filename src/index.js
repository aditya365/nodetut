// import app from  './app'
import express from "express";
import * as fs from "fs";
import queryParser from "./middlewares/query-parser";
import cookieParser from "./middlewares/cookie-parser";
import productsRouter from "./routes/productsRouter";
import usersRouter from "./routes/usersRouter";
var app = express();

const port = process.env.PORT || 8080;

app.use(queryParser); // to parse query parameters
app.use(cookieParser); // to parse cookies
app.use(express.json()); //to parse request body

app.use("/api/products", productsRouter); //handles all products related API
app.use("/api/users", usersRouter); // handles all users related API

app.listen(port, () => {
  console.log(`App started listening on ${port}`);
});
