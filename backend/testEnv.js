import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("./.env") });

console.log("TEST MONGO_URI =", process.env.MONGO_URI);
