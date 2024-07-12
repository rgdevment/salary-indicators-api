import { Injectable, NotFoundException } from '@nestjs/common';
import { IndicatorRepository } from './indicator.repository';
import { IndicatorEnum } from './indicator.enum';
import { IndicatorValueDto } from './dtos/indicator-value.dto';
import { IndicatorResponseDto } from './dtos/indicator-response.dto';

@Injectable()
export class IndicatorService {
  constructor(private readonly indicatorsRepository: IndicatorRepository) {}

  async findIndicatorDetails(
    indicator: IndicatorEnum,
  ): Promise<IndicatorResponseDto> {
    const currentIndicator =
      await this.indicatorsRepository.findCurrentDayOrLastRecord(indicator);
    const lastIndicator =
      await this.indicatorsRepository.findLastIndicatorOfMonth(indicator);
    const averageIndicatorValue =
      await this.indicatorsRepository.findAverageIndicatorOfMonth(indicator);
    const firstIndicator =
      await this.indicatorsRepository.findFirstIndicatorOfMonth(indicator);

    const currentIndicatorDto = new IndicatorValueDto(
      currentIndicator.value,
      new Date(currentIndicator.date),
      currentIndicator.value_to_word,
      'El valor correspondiente al día de hoy.',
    );
    const firstIndicatorDto = new IndicatorValueDto(
      firstIndicator.value,
      new Date(firstIndicator.date),
      firstIndicator.value_to_word,
      'El valor correspondiente al primer día del mes actual.',
    );
    const lastIndicatorDto = new IndicatorValueDto(
      lastIndicator.value,
      new Date(lastIndicator.date),
      lastIndicator.value_to_word,
      'El valor correspondiente al último día del mes o al último valor actualizado.',
    );

    return new IndicatorResponseDto(
      indicator,
      [currentIndicatorDto, firstIndicatorDto, lastIndicatorDto],
      averageIndicatorValue,
    );
  }

  async findCurrentIndicator(
    indicator: IndicatorEnum,
  ): Promise<IndicatorResponseDto> {
    const result =
      await this.indicatorsRepository.findCurrentDayOrLastRecord(indicator);

    if (!result) {
      throw new NotFoundException(
        `No se encontró información para el indicador ${indicator} en la fecha actual.`,
      );
    }

    const currentIndicatorDto = new IndicatorValueDto(
      result.value,
      new Date(result.date),
      result.value_to_word,
      '',
    );
    return new IndicatorResponseDto(indicator, [currentIndicatorDto]);
  }
}
