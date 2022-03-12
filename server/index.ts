import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import expressGraphQL from "express-graphql";

// Middleware
const app = express();
app.use(
    cors(),
    express.json(),
    bodyParser.json(),
    cookieParser(),
    express.urlencoded({ extended: false }),
    morgan("dev")
);

// use graphql
app.use(
    "/graphql",
    expressGraphQL({
        schema: {},
        rootValue: {},
        graphiql: true,
    })
);

// server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port`, PORT);
});
