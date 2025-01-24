import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerController } from './player/player.controller';
import { MatchController } from './match/match.controller';
import { RankingController } from './ranking/ranking.controller';

@Module({
  imports: [],
  controllers: [AppController, PlayerController, MatchController, RankingController],
  providers: [AppService],
})
export class AppModule {}
