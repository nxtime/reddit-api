import "dotenv/config";
import cors from "cors";
import express from "express";
import initialize from "../utils/initialize";
import routes from "./routes";

initialize();

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(routes);

export default app;