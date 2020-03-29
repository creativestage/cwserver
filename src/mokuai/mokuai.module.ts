import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MokuaiController } from './mokuai.controller';
import { MokuaiService } from './mokuai.service';
import { MokuaiSchema } from '../Schema';
@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Mokuai', schema: MokuaiSchema}])
  ],
  controllers: [MokuaiController],
  providers: [MokuaiService]
})
export class MokuaiModule {}
