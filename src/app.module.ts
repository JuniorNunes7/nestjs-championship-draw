import { Module } from '@nestjs/common';
import { DrawModule } from './draw/draw.module';

@Module({
  imports: [DrawModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
