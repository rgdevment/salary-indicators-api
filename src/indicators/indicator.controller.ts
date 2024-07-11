import { Controller, Get, Param } from "@nestjs/common";
import { IndicatorService } from "./indicator.service";

@Controller('indicadores')
export class IndicatorController {
  constructor(private readonly indicatorsService: IndicatorService) {}

  @Get(':indicator')
  async getIndicator(
    @Param('in"indicator"ndicatorParsePipe) indicator: IndicatorEnum,
 ) {
    const indicatorDto =
      await this.indicatorsService.findCurrentIndicatorValue(indicator);
    if (!indicatorDto) {
      throw new HttpException('No content', HttpStatus.NO_CONTENT);
    }
    return indicatorDto;
  }
}
