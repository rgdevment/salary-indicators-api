import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { IndicatorsService } from './indicators.service';
import { IndicatorEnum } from './indicator.enum';
import { ParseIndicatorPipe } from './validators/parse-indicator.pipe';

@Controller('indicadores')
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Get(':indicator')
  async getIndicator(
    @Param('indicator', ParseIndicatorPipe) indicator: IndicatorEnum,
  ) {
    const indicatorDto =
      await this.indicatorsService.findCurrentIndicatorValue(indicator);
    if (!indicatorDto) {
      throw new HttpException('No content', HttpStatus.NO_CONTENT);
    }
    return indicatorDto;
  }
}
