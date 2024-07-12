import { Controller, Get, Param, UseFilters } from "@nestjs/common";
import { IndicatorService } from './indicator.service';
import { IndicatorEnum } from './indicator.enum';
import { IndicatorParsePipe } from './validators/indicator-parse.pipe';
import { GlobalExceptionFilter } from "../common/filters/global-exception.filter";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IndicatorResponseDto } from "./dtos/indicator-response.dto";

@ApiTags('Indicadores')
@UseFilters(GlobalExceptionFilter)
@Controller('indicadores')
export class IndicatorController {
  constructor(private readonly indicatorsService: IndicatorService) {}

  @Get(':indicatorName')
  @ApiOperation({ summary: 'Obtiene un indicador especifico.', description: 'Recopila y procesa información sobre el indicador solicitado.' })
  @ApiResponse({ status: 200, description: 'Success', type: IndicatorResponseDto })
  async getIndicator(
    @Param('indicatorName', IndicatorParsePipe) indicatorName: IndicatorEnum,
  ) {
    if (indicatorName === IndicatorEnum.UF) {
      return await this.indicatorsService.retrieveDetailsUFIndicator();
    } else if (
      indicatorName === IndicatorEnum.DOLAR ||
      indicatorName === IndicatorEnum.EURO
    ) {
      return await this.indicatorsService.findIndicatorDetails(indicatorName);
    } else if (indicatorName === IndicatorEnum.IPC) {
      return await this.indicatorsService.retrieveDetailsIPCIndicator();
    }

    return await this.indicatorsService.findCurrentIndicator(indicatorName);
  }
}
