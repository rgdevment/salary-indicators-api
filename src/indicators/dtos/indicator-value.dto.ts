import { Transform } from "class-transformer";

export class IndicatorValueDto {
  value: number;
  date: string;
  details: string;
  @Transform(({ value }) => value ?? null, { toClassOnly: true })
  _note?: string;

  constructor(value: number, date: Date, value_to_word: string, _note?: string) {
    this.date = this.formatDate(date);
    this.value = value;
    this.details = value_to_word;
    this._note = _note;
  }

  private formatDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
}
