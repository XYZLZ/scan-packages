import express from "express";
import { config } from "dotenv";
import cors from "cors";
import {join, dirname, resolve} from 'node:path'
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
app.put('/package/count/:id', packageController.countPackage);
app.put('/package/weight/:id', packageController.weightUpdate);
app.delete('/package/:id', packageController.deletePackage);




if (process.env.NODE_ENV == 'production') {
  // * archivos estaticos 
  app.use(express.static(join(__dirname, 'dist')));
  app.get('*', (req, res)=>{
      res.sendFile(resolve(__dirname, "dist", "index.html"))
  })

}

app.use((req, res, next) => {
  res.send('Resourse not found');
  
  next();
})

// * start server
const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`);
  console.log(join(__dirname, 'public'));
});

export {server};
