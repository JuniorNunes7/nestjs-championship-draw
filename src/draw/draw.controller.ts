import { Body, Controller, Get } from '@nestjs/common';
import { DrawService } from './draw.service';
import { DoRandomDrawDTO } from './dto/do-random-draw.dto';

@Controller('draw')
export class DrawController {
  constructor(private readonly drawService: DrawService) {}

  @Get()
  async doRandomDraw(@Body() data: DoRandomDrawDTO) {
    return this.drawService.doRandomDraw(data);
  }
}
