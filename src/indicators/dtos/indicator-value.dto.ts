export class IndicatorValueDto {
  value: number;
  date: string;
  value_text: string;

  constructor(value: number, date: Date, value_to_word: string) {
    this.date = this.formatDate(date);
    this.value = value;
    this.value_text = value_to_word;
  }

  private formatDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
}
