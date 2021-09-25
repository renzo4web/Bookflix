import dotenv from "dotenv"
dotenv.config()

export default {
    jwtSecret: process.env.JWT_SECRET || "thisisasecret",

    DB: {
        NAME: process.env.DB_NAME || "bookflix",
        USER: process.env.DB_USER || "admin",
        PASSWORD: process.env.DB_PASSWORD || "admin",
        HOST: process.env.DB_HOST || "localhost",
        PORT: process.env.PORT || 5000,
    },
};