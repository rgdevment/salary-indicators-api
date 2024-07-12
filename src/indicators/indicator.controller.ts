import { Controller, Get, Param, UseFilters } from "@nestjs/common";
import { IndicatorService } from "./indicator.service";
import { IndicatorEnum } from "./indicator.enum";
import { IndicatorParsePipe } from "./validators/indicator-parse.pipe";
import { GlobalExceptionFilter } from "../common/filters/global-exception.filter";


@Controller('indicadores')
export class IndicatorController {
  constructor(private readonly indicatorsService: IndicatorService) {}

  @Get(':indicatorName')
  async getIndicator(
    @Param('indicatorName', IndicatorParsePipe) indicatorName: IndicatorEnum,
  ) {
    if (
      indicatorName === IndicatorEnum.UF ||
      indicatorName === IndicatorEnum.DOLAR ||
      indicatorName === IndicatorEnum.EURO
    ) {
      return await this.indicatorsService.findIndicatorDetails(indicatorName);
    } else if (indicatorName === IndicatorEnum.IPC) {
      return await this.indicatorsService.findIndicatorDetails(indicatorName);
    }

    return await this.indicatorsService.findCurrentIndicator(indicatorName);
  }
}
