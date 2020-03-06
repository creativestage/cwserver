import { Test, TestingModule } from '@nestjs/testing';
import { MokuaiController } from './mokuai.controller';

describe('Mokuai Controller', () => {
  let controller: MokuaiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MokuaiController],
    }).compile();

    controller = module.get<MokuaiController>(MokuaiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
