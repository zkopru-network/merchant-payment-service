import {NestFactory} from "@nestjs/core";
import {NestExpressApplication} from "@nestjs/platform-express";
import express from "express";
import {AppModule} from "./app.module";
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import fs from "fs";
import * as yaml from "js-yaml";

export async function createApp(): Promise<NestExpressApplication> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enable("trust proxy");
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    const config = new DocumentBuilder()
        .setTitle("merchant service server")
        .setDescription("v1 api")
        .setVersion("0.0.1")
        .addTag("merchant")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync(`swagger.yaml`, yaml.dump(document));
    SwaggerModule.setup('api', app, document);
    return app;
}