import { Test, TestingModule } from '@nestjs/testing';
import { RankingEventsController } from './ranking.events.controller';

describe('RankingController', () => {
  let controller: RankingEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingEventsController],
    }).compile();

    controller = module.get<RankingEventsController>(RankingEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
