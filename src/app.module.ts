import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {VerifySignMiddleware} from '../middleware/verifySign.middleware';
import config from '../config/config';
import { AuthModule } from './auth/auth.module';
import { MokuaiModule } from './mokuai/mokuai.module';
import { PageModule } from './page/page.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${config.dbUrl}/cwdata`, {
      useNewUrlParser: true,
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }
    }),
    AuthModule,
    MokuaiModule,
    PageModule
  ]
})
// export class AppModule implements NestModule{
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(VerifySignMiddleware)
//       .forRoutes('api');
//   }
// }
export class AppModule {}