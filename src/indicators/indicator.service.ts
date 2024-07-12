import { Injectable, NotFoundException } from '@nestjs/common';
import { IndicatorRepository } from './indicator.repository';
import { IndicatorEnum } from './indicator.enum';
import { IndicatorValueDto } from './dtos/indicator-value.dto';
import { IndicatorResponseDto } from './dtos/indicator-response.dto';
import { I18nService } from "nestjs-i18n";

@Injectable()
export class IndicatorService {
  constructor(private readonly repository: IndicatorRepository, private readonly i18n: I18nService) {}

  async retrieveDetailsUFIndicators(): Promise<IndicatorResponseDto> {
    const currentIndicator = await this.repository.findCurrentDayOrLastRecord(IndicatorEnum.UF);
    const firstIndicator = await this.repository.findFirstIndicatorOfMonth(IndicatorEnum.UF);
    const averageIndicatorValue = await this.repository.findAverageIndicatorOfMonth(IndicatorEnum.UF);
    const lastIndicator = await this.repository.findLastIndicatorOfMonth(IndicatorEnum.UF);

    const currentIndicatorDto = new IndicatorValueDto(
      currentIndicator.value,
      new Date(currentIndicator.date),
      currentIndicator.value_to_word,
      this.i18n.t('indicators.currentValueNote')
    );
    const firstIndicatorDto = new IndicatorValueDto(
      firstIndicator.value,
      new Date(firstIndicator.date),
      firstIndicator.value_to_word,
      this.i18n.t('indicators.firstDayOfMonthNote')
    );
    const lastIndicatorDto = new IndicatorValueDto(
      lastIndicator.value,
      new Date(lastIndicator.date),
      lastIndicator.value_to_word,
      this.i18n.t('indicators.lastRecordedValueNote')
    );

    return new IndicatorResponseDto(
      IndicatorEnum.UF,
      [currentIndicatorDto, firstIndicatorDto, lastIndicatorDto],
      averageIndicatorValue,
    );
  }

  async findIndicatorDetails(
    indicator: IndicatorEnum,
  ): Promise<IndicatorResponseDto> {
    const currentIndicator = await this.repository.findCurrentDayOrLastRecord(indicator);
    const firstIndicator = await this.repository.findFirstIndicatorOfMonth(indicator);
    const averageIndicatorValue = await this.repository.findAverageIndicatorOfMonth(indicator);

    const currentIndicatorDto = new IndicatorValueDto(
      currentIndicator.value,
      new Date(currentIndicator.date),
      currentIndicator.value_to_word,
      this.i18n.t('indicators.currentValueNote')
    );
    const firstIndicatorDto = new IndicatorValueDto(
      firstIndicator.value,
      new Date(firstIndicator.date),
      firstIndicator.value_to_word,
      this.i18n.t('indicators.firstDayOfMonthNote')
    );

    return new IndicatorResponseDto(
      indicator,
      [currentIndicatorDto, firstIndicatorDto],
      averageIndicatorValue,
    );
  }

  async findCurrentIndicator(
    indicator: IndicatorEnum,
  ): Promise<IndicatorResponseDto> {
    const result = await this.repository.findCurrentDayOrLastRecord(indicator);

    if (!result) {
      throw new NotFoundException(
        this.i18n.t('indicators.indicatorNotFound', { args: { indicator } }),
      );
    }

    const currentIndicatorDto = new IndicatorValueDto(
      result.value,
      new Date(result.date),
      result.value_to_word,
    );
    return new IndicatorResponseDto(indicator, [currentIndicatorDto]);
  }
}
