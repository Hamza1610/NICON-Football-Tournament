import express from "express";
import { initDb } from "./sequelize";


const app = express();
app.use(express.json());


// Initialize DB and models
initDb().then(() => {
  console.log("DB initialized");
}).catch(console.error);

// Routes
app.get("/health", () => {
  return { status: "ok", timestamp: new Date() };
});

export default app;
