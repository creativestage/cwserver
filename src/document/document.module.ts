import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocSchema } from '../Schema';
@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Doc', schema: DocSchema}])
  ],
  controllers: [DocumentController],
  providers: [DocumentService]
})
export class DocModule {}
