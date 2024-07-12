import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { IndicatorEnum } from '../indicator.enum';
import { I18nService } from "nestjs-i18n";

@Injectable()
export class IndicatorParsePipe implements PipeTransform<string, IndicatorEnum> {
  constructor(private readonly i18n: I18nService) {}

  transform(value: string): IndicatorEnum {
    const enumValue = value.toUpperCase() as unknown as IndicatorEnum;

    if (!Object.values(IndicatorEnum).includes(enumValue)) {
      const message = this.i18n.t('indicators.invalidIndicatorValue', { args: { value } });
      throw new BadRequestException(message);
    }

    return enumValue;
  }
}
