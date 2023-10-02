import express from "express";
import { config } from "dotenv";
import cors from "cors";
import * as packageController from "./controllers/index.controller.js";

// * configuraciones
config();
const app = express();
const port = process.env.PORT ?? 3000;

// * middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// * rutas
app.get("/get", packageController.getAll);
app.get('/get/:id', packageController.getById);
app.post('/package', packageController.createPackage);
app.put('/package/:id', packageController.updatePackage);
app.delete('/package/:id', packageController.deletePackage);

// * start server

const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

export {server};
