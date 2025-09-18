import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { LeaguesModule } from './leagues/leagues.module';
import { RacesModule } from './races/races.module';
import { BonusesModule } from './bonuses/bonuses.module';
import { BetsModule } from './bets/bets.module';
import { RidersModule } from './riders/riders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ! not recommended for production
    }),
    UsersModule,
    LeaguesModule,
    RacesModule,
    BonusesModule,
    BetsModule,
    RidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
