import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { IndicatorEnum } from '../indicator.enum';

@Injectable()
export class ParseIndicatorPipe
  implements PipeTransform<string, IndicatorEnum>
{
  transform(value: string): IndicatorEnum {
    const enumValue = value.toUpperCase() as unknown as IndicatorEnum;

    if (!Object.values(IndicatorEnum).includes(enumValue)) {
      throw new BadRequestException(`${value} is not a valid indicator value`);
    }

    return enumValue;
  }
}
