import express from "express";
import { config } from "dotenv";
import cors from "cors";
import {join, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

import * as packageController from "./controllers/index.controller.js";

// * configuraciones
config();
const app = express();
const port = process.env.PORT ?? 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

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

// * archivos estaticos 
app.use(express.static(join(__dirname, 'frontend', 'dist')));

// * start server

const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`);
  console.log(join(__dirname, 'public'));
});

export {server};
