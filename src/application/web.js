import express from "express";
import { publictRouter } from "../route/public-api.js";
import dotenv from "dotenv";
import privateRouter from "../route/private-route-api.js";
dotenv.config();
export const web = express();

web.use(express.json());
web.use(publictRouter);

web.use(privateRouter);

export default web;
