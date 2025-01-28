import { Test, TestingModule } from '@nestjs/testing';
import { RankingEventsController } from './ranking.events.controller';
import { AppService } from '../../app.service';

describe('RankingEventsController', () => {
  let controller: RankingEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingEventsController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getEventEmitter: jest.fn().mockReturnValue({
              on: jest.fn(),
              removeAllListeners: jest.fn(),
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<RankingEventsController>(RankingEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
