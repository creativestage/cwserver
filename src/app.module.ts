import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {VerifySignMiddleware} from '../middleware/verifySign.middleware';
import config from '../config/config';
import { AuthModule } from './auth/auth.module';
import { MokuaiModule } from './mokuai/mokuai.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${config.dbUrl}/cwdata`),
    AuthModule,
    MokuaiModule
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifySignMiddleware)
      .forRoutes('api');
  }
}
