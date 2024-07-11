export class IndicatorResponseDto {
  indicator: string;
  value: number;
  date: string;
  value_to_word: string;

  constructor(
    indicator: string,
    value: number,
    date: Date,
    value_to_word: string,
  ) {
    this.indicator = indicator;
    this.value = value;
    this.date = this.formatDate(date);
    this.value_to_word = value_to_word;
  }

  private formatDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
}
