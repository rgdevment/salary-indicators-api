export class IndicatorValueDto {
  value: number;
  date: string;
  value_to_word: string;
  description: string;

  constructor(value: number, date: Date, value_to_word: string, description: string) {
    this.date = this.formatDate(date);
    this.value = value;
    this.value_to_word = value_to_word;
    this.description = description;
  }

  private formatDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
}