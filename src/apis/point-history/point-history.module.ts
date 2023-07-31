import { Module } from '@nestjs/common';
import { PointHistoryController } from './point-history.controller';
import { PointHistoryService } from './point-history.service';

@Module({
  controllers: [PointHistoryController],
  providers: [PointHistoryService]
})
export class PointHistoryModule {}
