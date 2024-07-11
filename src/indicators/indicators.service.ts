import { Injectable } from "@nestjs/common";
import { IndicatorsRepository } from './indicators.repository';
import { IndicatorResponseDto } from './dto/indicator-response.dto';
import { IndicatorEnum } from './indicator.enum';

@Injectable()
export class IndicatorsService {
  constructor(private readonly indicatorsRepository: IndicatorsRepository) {}

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
