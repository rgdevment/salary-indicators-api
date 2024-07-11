import { Injectable, NotFoundException } from '@nestjs/common';
import { IndicatorRepository } from './indicator.repository';
import { IndicatorResponseDto } from './dtos/indicator-response.dto';
import { IndicatorEnum } from './indicator.enum';

@Injectable()
export class IndicatorService {
  constructor(private readonly indicatorsRepository: IndicatorRepository) {}

  async findCurrentIndicator(
    indicator: IndicatorEnum,
  ): Promise<IndicatorResponseDto> {
    const result = await this.indicatorsRepository.findOne(indicator);

    if (!result) {
      throw new NotFoundException(
        `No se encontró información para el indicador ${indicator} en la fecha actual.`,
      );
    }

    return new IndicatorResponseDto(
      result.indicator,
      result.value,
      new Date(result.date),
      result.value_to_word,
    );
  }
}
