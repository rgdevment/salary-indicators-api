import { Transform } from 'class-transformer';

export class IndicatorBaseResponseDto {
  indicator: string;
  @Transform(({ value }) => value ?? null, { toClassOnly: true })
  average?: number;

  constructor(indicator: string, average?: number) {
    this.indicator = indicator;
    this.average = average;
  }
}
