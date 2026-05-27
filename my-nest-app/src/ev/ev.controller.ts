import { Controller, Get } from '@nestjs/common';
import { EvService } from './ev.service';

@Controller('ev')
export class EvController {
  constructor(private readonly evService: EvService) {}

  @Get()
  getUrl() {
    console.log("ev controller reached!!!");
    return this.evService.getDbUrl();
  }
}
