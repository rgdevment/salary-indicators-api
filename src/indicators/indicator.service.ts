import { Injectable } from '@nestjs/common';
import { IndicatorRepository } from './indicator.repository';
import { IndicatorResponseDto } from './dtos/indicator-response.dto';
import { IndicatorEnum } from './indicator.enum';

@Injectable()
export class IndicatorService {
  constructor(private readonly indicatorsRepository: IndicatorRepository) {}

  async findCurrentIndicatorValue(
    indicator: IndicatorEnum,
  ): Promise<IndicatorResponseDto | null> {
    const result = await this.indicatorsRepository.findOne(indicator);

    if (!result) {
      return null;
    }

    return new IndicatorResponseDto(
      result.indicator,
      result.value,
      new Date(result.date),
      result.value_to_word,
    );
  }
}
