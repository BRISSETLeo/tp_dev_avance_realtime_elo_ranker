import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { AppService } from '../app.service';
import { PlayerService } from './player.service';

describe('PlayerController', () => {
  let controller: PlayerController;
  let appService: AppService;
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        {
          provide: AppService,
          useValue: {
            notifyObservers: jest.fn(),
          },
        },
        {
          provide: PlayerService,
          useValue: {
            getPlayers: jest.fn().mockResolvedValue('[]'),
            getPlayer: jest.fn(),
            getAllPlayers: jest.fn().mockResolvedValue([]),
            addPlayer: jest.fn().mockImplementation((player) => player),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
    appService = module.get<AppService>(AppService);
    playerService = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all players', async () => {
      const result = await controller.getAll();
      expect(result).toBe('[]');
    });
  });

  describe('addPlayer', () => {
    it('should return 400 if player id is not provided', async () => {
      const result = await controller.addPlayer({});
      expect(result).toEqual({
        ok: false,
        code: 400,
        message: "L'identifiant du joueur n'est pas valide",
      });
    });

    it('should return 409 if player already exists', async () => {
      playerService.getPlayer = jest.fn().mockResolvedValue({ id: 1 });
      const result = await controller.addPlayer({ id: 1, name: 'Player1' });
      expect(result).toEqual({
        ok: false,
        code: 409,
        message: 'Le joueur existe déjà',
      });
    });

    it('should add player with default rank if rank is not provided', async () => {
      const player = { id: 1, name: 'Player1' };
      const result = await controller.addPlayer(player);
      expect(result).toEqual({
        ok: true,
        code: 200,
        message: 'Joueur créé avec succès',
      });
      expect(playerService.addPlayer).toHaveBeenCalledWith({ ...player, rank: 1000 });
    });

    it('should add player with provided rank', async () => {
      const player = { id: 1, name: 'Player1', rank: 1200 };
      const result = await controller.addPlayer(player);
      expect(result).toEqual({
        ok: true,
        code: 200,
        message: 'Joueur créé avec succès',
      });
      expect(playerService.addPlayer).toHaveBeenCalledWith(player);
    });

    it('should notify observers when a player is added', async () => {
      const player = { id: 1, name: 'Player1', rank: 1200 };
      await controller.addPlayer(player);
      expect(appService.notifyObservers).toHaveBeenCalledWith(player);
    });

    it('should calculate average rank if rank is not provided', async () => {
      playerService.getAllPlayers = jest.fn().mockResolvedValue([{ rank: 1000 }, { rank: 2000 }]);
      const player = { id: 2, name: 'Player2' };
      const result = await controller.addPlayer(player);
      expect(result).toEqual({
        ok: true,
        code: 200,
        message: 'Joueur créé avec succès',
      });
      expect(playerService.addPlayer).toHaveBeenCalledWith({ ...player, rank: 1000 });
    });
  });
});
