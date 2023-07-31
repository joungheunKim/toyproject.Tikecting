import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './apis/user/user.module';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { ConcertModule } from './apis/concert/concert.module';
import { ReservationModule } from './apis/reservation/reservation.module';
import { AuthModule } from './apis/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({  // forRoot -> forRootAsync로 변경
      useClass: TypeOrmConfigService,  
    }),
    UserModule,
    // ConcertModule,
    // ReservationModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
