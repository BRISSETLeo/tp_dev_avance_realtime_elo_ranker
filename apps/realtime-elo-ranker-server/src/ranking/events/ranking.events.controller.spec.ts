import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { RankingEventsController } from './ranking.events.controller';
import { AppService } from 'src/app.service';

describe('RankingEventsController', () => {
  let controller: RankingEventsController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingEventsController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getRankingUpdates: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RankingEventsController>(RankingEventsController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getRankingUpdates and return an Observable', (done) => {
    const mockUpdate = { rank: 1, player: 'Player1' };
    jest.spyOn(appService, 'getRankingUpdates').mockReturnValue(of(mockUpdate));

    controller.subscribeToRankingUpdates().subscribe((event) => {
      expect(event.data).toBe(JSON.stringify(mockUpdate));
      done();
    });
  });

  it('should map the update to MessageEvent format', (done) => {
    const mockUpdate = { rank: 1, player: 'Player1' };
    jest.spyOn(appService, 'getRankingUpdates').mockReturnValue(of(mockUpdate));

    controller.subscribeToRankingUpdates().subscribe((event) => {
      expect(event).toEqual({ data: JSON.stringify(mockUpdate) });
      done();
    });
  });
});
