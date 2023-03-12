import { Module } from '@nestjs/common';
import { DrawController } from './draw.controller';
import { DrawService } from './draw.service';

@Module({
  imports: [],
  controllers: [DrawController],
  providers: [DrawService],
})
export class DrawModule {}
