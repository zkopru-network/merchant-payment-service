import {NestFactory} from "@nestjs/core";
import {NestExpressApplication} from "@nestjs/platform-express";
import express from "express";
import {AppModule} from "./app.module";

export async function createApp(): Promise<NestExpressApplication> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enable("trust proxy");
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    return app;
}