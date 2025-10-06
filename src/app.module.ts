import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { LeaguesModule } from './leagues/leagues.module';
import { RacesModule } from './races/races.module';
import { RidersModule } from './riders/riders.module';
import { UserLeagueModule } from './user_league/user_league.module';
import { PredictionsModule } from './predictions/predictions.module';
import { BadgesModule } from './badges/badges.module';
import { NotifiactionsModule } from './notifiactions/notifiactions.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ScraperModule } from './scraper/scraper.module';
import { ScrapperService } from './scrapper/scrapper.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get<string>('NODE_ENV') === 'development', // synchro auto seulement en dev
      }),
    }),
    UsersModule,
    LeaguesModule,
    RacesModule,
    RidersModule,
    UserLeagueModule,
    PredictionsModule,
    BadgesModule,
    NotifiactionsModule,
    AuthModule,
    AdminModule,
    ScraperModule,
  ],
  controllers: [AppController],
  providers: [AppService, ScrapperService],
})
export class AppModule {}
