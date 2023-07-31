import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config/dist';
import { User } from 'src/apis/user/user.entity';
import { Concert } from 'src/apis/concert/concert.entity';
import { Reservation } from 'src/apis/reservation/reservation.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}
  
    createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
        type: 'mysql',
        host: this.configService.get<string>('DATABASE_HOST'),
        port: this.configService.get<number>('DATABASE_PORT'),
        username: this.configService.get<string>('DATABASE_USERNAME'),
        password: this.configService.get<string>('DATABASE_PASSWORD'),
        database: this.configService.get<string>('DATABASE_DATABASE'),
        entities: [User,Concert,Reservation],
        synchronize: true,
    };
  }
}