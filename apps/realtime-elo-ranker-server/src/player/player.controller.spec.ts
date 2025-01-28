import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { AppService } from '../app.service';

describe('PlayerController', () => {
  let controller: PlayerController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        {
          provide: AppService,
          useValue: {
            players: [],
            notifyObservers: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all players', () => {
      const players = [{ id: 1, name: 'Player1', rank: 1000 }];
      appService.players = players;
      expect(controller.getAll()).toBe(JSON.stringify(players));
    });
  });

  describe('addPlayer', () => {
    it('should return 400 if player id is not provided', () => {
      const result = controller.addPlayer({});
      expect(result).toEqual({
        ok: false,
        code: 400,
        message: "L'identifiant du joueur n'est pas valide",
      });
    });

    it('should return 409 if player already exists', () => {
      const player = { id: 1, name: 'Player1', rank: 1000 };
      appService.players = [player];
      const result = controller.addPlayer(player);
      expect(result).toEqual({
        ok: false,
        code: 409,
        message: 'Le joueur existe déjà',
      });
    });

    it('should add player with default rank if rank is not provided', () => {
      const player = { id: 1, name: 'Player1' };
      const result = controller.addPlayer(player);
      expect(result).toEqual({
        ok: true,
        code: 200,
        message: 'Joueur créé avec succès',
      });
      expect(appService.players).toContainEqual({ ...player, rank: 1000 });
    });

    it('should add player with provided rank', () => {
      const player = { id: 1, name: 'Player1', rank: 1200 };
      const result = controller.addPlayer(player);
      expect(result).toEqual({
        ok: true,
        code: 200,
        message: 'Joueur créé avec succès',
      });
      expect(appService.players).toContainEqual(player);
    });

    it('should notify observers when a player is added', () => {
      const player = { id: 1, name: 'Player1', rank: 1200 };
      controller.addPlayer(player);
      expect(appService.notifyObservers).toHaveBeenCalledWith(player);
    });
  });
});
