import { Controller, Get, Param } from '@nestjs/common';
import { IndicatorService } from './indicator.service';
import { IndicatorEnum } from './indicator.enum';
import { IndicatorParsePipe } from './validators/indicator-parse.pipe';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndicatorResponseDto } from './dtos/indicator-response.dto';

@ApiTags('Indicadores')
//@UseFilters(GlobalExceptionFilter)
@Controller('indicadores')
export class IndicatorController {
  constructor(private readonly indicatorsService: IndicatorService) {}

  @Get(':indicatorName')
  @ApiOperation({
    summary: 'Obtiene un indicador especifico.',
    description: 'Recopila y procesa información sobre el indicador solicitado.',
  })
  @ApiResponse({ status: 200, description: 'Success', type: IndicatorResponseDto })
  async getIndicator(@Param('indicatorName', IndicatorParsePipe) indicator: IndicatorEnum) {
    if (indicator === IndicatorEnum.UF) {
      return await this.indicatorsService.retrieveDetailsUFIndicator(indicator);
    } else if (indicator === IndicatorEnum.DOLAR || indicator === IndicatorEnum.EURO) {
      return await this.indicatorsService.findIndicatorDetails(indicator);
    } else if (indicator === IndicatorEnum.IPC) {
      return await this.indicatorsService.retrieveDetailsIPCIndicator(indicator);
    }

    return await this.indicatorsService.findCurrentIndicator(indicator);
  }
}
