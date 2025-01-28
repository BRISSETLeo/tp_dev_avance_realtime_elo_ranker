import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppService } from './app.service';

describe('AppService', () => {
    let service: AppService;
    let eventEmitter: EventEmitter2;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppService,
                {
                    provide: EventEmitter2,
                    useValue: {
                        emit: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AppService>(AppService);
        eventEmitter = module.get<EventEmitter2>(EventEmitter2);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return the event emitter', () => {
        expect(service.getEventEmitter()).toBe(eventEmitter);
    });

    it('should notify observers', () => {
        const player = { id: 1, name: 'John Doe' };
        service.notifyObservers(player);
        expect(eventEmitter.emit).toHaveBeenCalledWith('RankingUpdate', player);
    });
});