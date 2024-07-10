export class IndicatorResponseDto {
  indicator: string;
  value: number;
  date: Date;
  value_to_word: string;

  constructor(
    indicator: string,
    value: number,
    date: Date,
    value_to_word: string,
  ) {
    this.indicator = indicator;
    this.value = value;
    this.date = date;
    this.value_to_word = value_to_word;
  }
}
