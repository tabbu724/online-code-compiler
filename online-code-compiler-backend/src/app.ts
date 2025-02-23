// const serverless = require("serverless-http");
const PORT = 3000;
// import express = require("express");
import express, { Request, Response , NextFunction} from "express";
import * as bodyParser from 'body-parser'
import appRoutes from './routes/appRoutes'
import serverless from 'serverless-http'
import { createDbConnection } from "./dbconnection/createConnection";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', appRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('req1', req)
  console.log('res1', res)
  
  return res.status(404).json({
    error: "Not Found",
  });
});


export const handler = serverless(app, {
  async request() {
    console.log('starting db settings');
    
      await createDbConnection();
  }});