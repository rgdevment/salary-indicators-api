import { Injectable, NotFoundException } from '@nestjs/common';
import { IndicatorRepository } from './indicator.repository';
import { IndicatorEnum } from './indicator.enum';
import { IndicatorValueDto } from './dtos/indicator-value.dto';
import { IndicatorResponseDto } from './dtos/indicator-response.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class IndicatorService {
  constructor(
    private readonly repository: IndicatorRepository,
    private readonly i18n: I18nService,
  ) {}

  async retrieveDetailsIPCIndicator(): Promise<IndicatorResponseDto> {
    const indicator = IndicatorEnum.IPC;
    const currentIndicator = await this.repository.findCurrentDayOrLastRecord(
      indicator
    );
    const accumulatedYearly =
      await this.repository.findAccumulatedOfIndicatorsLast12Months(
        indicator
      );
    const accumulated =
      await this.repository.findYearlyAccumulatedRecord(indicator);

    if (!currentIndicator) {
      throw new NotFoundException(
        this.i18n.t('indicators.indicatorNotFound', {
          args: { indicator},
        }),
      );
    }

    const currentIndicatorDto = new IndicatorValueDto(
      currentIndicator.value,
      new Date(currentIndicator.date),
      currentIndicator.value_to_word,
      this.i18n.t('indicators.currentValueNote'),
    );

    return new IndicatorResponseDto({
      indicator,
      data: [currentIndicatorDto],
      accumulated,
      accumulatedYearly,
    });
  }

  async retrieveDetailsUFIndicator(): Promise<IndicatorResponseDto> {
    const indicator = IndicatorEnum.UF;
    const currentIndicator = await this.repository.findCurrentDayOrLastRecord(
      indicator,
    );
    const firstIndicator = await this.repository.findFirstIndicatorOfMonth(
      indicator,
    );
    const average = await this.repository.findAverageIndicatorOfMonth(
      indicator,
    );
    const lastIndicator =
      await this.repository.findLastIndicatorOfMonthOrLastRecord(
        indicator,
      );

    if (!currentIndicator || !firstIndicator || !lastIndicator) {
      throw new NotFoundException(
        this.i18n.t('indicators.indicatorNotFound', {
          args: { indicator },
        }),
      );
    }

    const currentIndicatorDto = new IndicatorValueDto(
      currentIndicator.value,
      new Date(currentIndicator.date),
      currentIndicator.value_to_word,
      this.i18n.t("indicators.currentValueNote"),
    );
    const firstIndicatorDto = new IndicatorValueDto(
      firstIndicator.value,
      new Date(firstIndicator.date),
      firstIndicator.value_to_word,
      this.i18n.t("indicators.firstDayOfMonthNote")
    );
    const lastIndicatorDto = new IndicatorValueDto(
      lastIndicator.value,
      new Date(lastIndicator.date),
      lastIndicator.value_to_word,
      this.i18n.t("indicators.lastRecordedValueNote")
    );

    return new IndicatorResponseDto({
      indicator,
      data: [currentIndicatorDto, firstIndicatorDto, lastIndicatorDto],
      average
    });
  }

  async findIndicatorDetails(
    indicator: IndicatorEnum,
  ): Promise<IndicatorResponseDto> {
    const currentIndicator =
      await this.repository.findCurrentDayOrLastRecord(indicator);
    const firstIndicator =
      await this.repository.findFirstIndicatorOfMonth(indicator);
    const average =
      await this.repository.findAverageIndicatorOfMonth(indicator);

    const currentIndicatorDto = new IndicatorValueDto(
      currentIndicator.value,
      new Date(currentIndicator.date),
      currentIndicator.value_to_word,
      this.i18n.t("indicators.currentValueNote")
    );
    const firstIndicatorDto = new IndicatorValueDto(
      firstIndicator.value,
      new Date(firstIndicator.date),
      firstIndicator.value_to_word,
      this.i18n.t("indicators.firstDayOfMonthNote")
    );

    return new IndicatorResponseDto({
      indicator,
      data: [currentIndicatorDto, firstIndicatorDto],
      average
    });
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
    return new IndicatorResponseDto({ indicator, data: [currentIndicatorDto] });
  }
}
