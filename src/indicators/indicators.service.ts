import { BadRequestException, Injectable } from '@nestjs/common';
import { IndicatorsRepository } from './indicators.repository';
import { IndicatorResponseDto } from './dto/indicator-response.dto';
import { IndicatorType } from './indicator-type.enum';

@Injectable()
export class IndicatorsService {
  constructor(private readonly indicatorsRepository: IndicatorsRepository) {}

  async findCurrentIndicatorValue(
    indicator: string,
  ): Promise<IndicatorResponseDto | null> {
    const indicatorType = this.toIndicatorType(indicator);
    console.log('indicatorType', indicatorType);
    if (!indicatorType) {
      throw new BadRequestException({
        message: `${indicator} is not a valid indicator type.`,
      });
    }
    const currentDate = new Date().toISOString().split('T')[0];
    const result = await this.indicatorsRepository.findOne(
      indicatorType.valueOf(),
      currentDate,
    );
    if (!result) {
      return null;
    }
    return new IndicatorResponseDto(
      result.indicator,
      result.value,
      result.date,
      result.value_to_word,
    );
  }

  private toIndicatorType(value: string): IndicatorType | undefined {
    const enumValues = Object.values(IndicatorType) as string[];
    if (enumValues.includes(value.toUpperCase())) {
      return value.toUpperCase() as IndicatorType;
    }
    return undefined;
  }
}
