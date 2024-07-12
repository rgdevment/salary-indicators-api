import { IndicatorEnum } from '../indicator.enum';
import { Indicator } from '../schemas/indicator.schema';

export interface IndicatorRepositoryInterface {
  findCurrentOrLastDayRecord(indicator: IndicatorEnum): Promise<Indicator>;
  findFirstRecordOfMonth(indicator: IndicatorEnum): Promise<Indicator>;
  calculateAverageValueOfMonth(indicator: IndicatorEnum): Promise<number>;
  findLastRecordOfMonth(indicator: IndicatorEnum): Promise<Indicator>;
  calculateAccumulatedValueLast12Months(indicator: IndicatorEnum): Promise<number>;
  calculateYearlyAccumulatedValue(indicator: IndicatorEnum): Promise<number>;
}
