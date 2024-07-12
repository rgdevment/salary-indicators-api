import { IndicatorValueDto } from './indicator-value.dto';
import { IndicatorBaseResponseDto } from './indicator-base-response.dto';

export class IndicatorResponseDto extends IndicatorBaseResponseDto {
  data: IndicatorValueDto[];

  constructor(
    indicator: string,
    indicatorValues: IndicatorValueDto[],
    average?: number,
  ) {
    super(indicator, average);
    this.data = indicatorValues;
  }
}
