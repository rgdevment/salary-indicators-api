import { Injectable } from '@nestjs/common';
import { IndicatorsRepository } from './indicators.repository';
import { Indicator } from './schemas/indicator.schema';
import { IndicatorType } from './indicator-type.enum';

@Injectable()
export class IndicatorsService {
  constructor(private readonly indicatorsRepository: IndicatorsRepository) {}

  async findAll(): Promise<Indicator[]> {
    return this.indicatorsRepository.findAll();
  }

  async findByType(type: IndicatorType): Promise<Indicator[]> {
    return this.indicatorsRepository.findByType(type);
  }

  async findOne(type: IndicatorType, date: string): Promise<Indicator> {
    return this.indicatorsRepository.findOne(type, date);
  }
}
