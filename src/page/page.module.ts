import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageController } from './page.controller';
import { PageService } from './page.service'
import {MokuaiSchema, PageSchema} from '../Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Page', schema: PageSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'Mokuai', schema: MokuaiSchema }
    ]),
  ],
  controllers: [PageController],
  providers: [PageService]
})
export class PageModule { }
