import { Controller, Get, Param } from '@nestjs/common';
import { IndicatorsService } from './indicators.service';
import { IndicatorType } from './indicator-type.enum';

@Controller('indicators')
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Get()
  async findAll() {
    return this.indicatorsService.findAll();
  }

  @Get(':type')
  async findByType(@Param('type') type: IndicatorType) {
    return this.indicatorsService.findByType(type);
  }

  @Get(':type/:date')
  async findOne(@Param('type') type: IndicatorType, @Param('date') date: string) {
    return this.indicatorsService.findOne(type, date);
  }
}
