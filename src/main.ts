import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from '../config/config';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || config.safeOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(session({ secret: 'cwsessionid', cookie: { maxAge: Infinity }}))
  // swagger配置
  const options = new DocumentBuilder()
    .setTitle('Nodejs + Vuejs 全栈项目-前端API')
    .setDescription('供前端界面调用的服务端API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(4800);
}
bootstrap();
