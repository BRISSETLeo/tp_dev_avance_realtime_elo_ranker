import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { PlayerController } from './player/player.controller';
import { MatchController } from './match/match.controller';
import { RankingController } from './ranking/ranking.controller';
import { RankingEventsController } from './ranking/events/ranking.events.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController, PlayerController, MatchController, RankingController, RankingEventsController],
  providers: [AppService],
})
export class AppModule {}
