// import express from "express";
// import { initDb } from "./sequelize";
// import apiRoutes from './routes';
// import { Request, Response } from "express";

// const app = express();
// app.use(express.json());

// // Initialize DB and models
// initDb().then(() => {
//   console.log("DB initialized");
// }).catch(console.error);

// // Routes
// app.use('/api', apiRoutes);

// app.get("/health", (req: Request, res: Response) => {
//     res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// // Error handling middleware
// app.use((err: any, req: Request, res: Response) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// // 404 handler
// // app.use('*0', (req: Request, res: Response) => {
// //   res.status(404).json({ error: 'Route not found' });
// // });


// export default app;




// src/app.ts
import express from "express";
import { initDb } from "./sequelize";
import apiRoutes from './routes';
import { Request, Response, NextFunction } from "express"; // Import NextFunction

const app = express();
app.use(express.json());

// Initialize DB and models
initDb().then(() => {
  console.log("DB initialized");
}).catch(console.error);

// Routes
app.use('/api', apiRoutes);

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware - FIXED: Added 'next' parameter
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
// app.use('*0', (req: Request, res: Response) => {
//   res.status(404).json({ error: 'Route not found' });
// });

export default app;