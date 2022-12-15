import express from 'express';
import { routes } from './route';
import updateDroneData from './helper/drone_helper';
const cors = require('cors');
//import * as xmlparser from "express-xml-bodyparser";
const xmlparser = require("express-xml-bodyparser");
const app = express();
app.use(express.json());
app.use(xmlparser());
app.use(cors());
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

setInterval(() => {
  console.log("INTERVAL UPDATE!");
  updateDroneData();

}, 2000);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});