import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { IndicatorsService } from './indicators.service';
import { Response } from 'express';

@Controller('indicators')
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Get(':indicator')
  async getIndicator(
    @Param('indicator') indicator: string,
    @Res() res: Response,
  ) {
    try {
      const indicatorValue = await this.indicatorsService.findCurrentIndicatorValue(indicator);
      if (indicatorValue) {
        res.status(HttpStatus.OK).json(indicatorValue);
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'Indicator not found' });
      }
    } catch (error) {
      const errorMessage = error.response?.message || error.message || 'Internal server error';
      const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      res.status(statusCode).json({ message: errorMessage });
    }
  }
}
