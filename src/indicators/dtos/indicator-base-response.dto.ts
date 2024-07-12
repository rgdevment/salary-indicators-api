import { IndicatorValueDto } from "./indicator-value.dto";

export class IndicatorResponseDto {
  indicator: string;
  current_value: IndicatorValueDto;
  first_record_month: IndicatorValueDto;
  average_month: IndicatorValueDto;
  last_record_month: IndicatorValueDto;

  constructor(indicator: string, current_value: IndicatorValueDto, first_record_month: IndicatorValueDto, average_month: IndicatorValueDto, last_record_month: IndicatorValueDto) {
    this.indicator = indicator;
    this.current_value = current_value;
    this.first_record_month = first_record_month;
    this.average_month = average_month;
    this.last_record_month = last_record_month;
  }
}