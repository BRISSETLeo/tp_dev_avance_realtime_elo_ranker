import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { Match } from '../models/match.entity';

describe('MatchService', () => {
    let service: MatchService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MatchService],
        }).compile();

        service = module.get<MatchService>(MatchService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getMatches', () => {
        it('should return an array of matches', async () => {
            const matches = [{ winner: 'Player1', loser: 'Player2' }];
            jest.spyOn(Match, 'find').mockResolvedValue(matches as any);

            const result = await service.getMatches();
            expect(result).toBe(JSON.stringify(matches));
        });
    });

    describe('addMatch', () => {
        it('should add a new match', async () => {
            const match = { winner: 'Player1', loser: 'Player2' };
            const saveMock = jest.fn().mockResolvedValue(undefined);
            jest.spyOn(Match.prototype, 'save').mockImplementation(saveMock);

            await service.addMatch(match);
            expect(saveMock).toHaveBeenCalled();
        });
    });
});