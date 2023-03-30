import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
const express = require("express")
// import express from 'express'
async function bootstrap() {
 
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(5500);
}
bootstrap();
