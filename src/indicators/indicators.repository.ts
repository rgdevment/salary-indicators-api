import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Indicator } from './schemas/indicator.schema';
import { IndicatorType } from './indicator-type.enum';

@Injectable()
export class IndicatorsRepository {
  constructor(@InjectModel(Indicator.name) private readonly indicatorModel: Model<Indicator>) {}

  async findAll(): Promise<Indicator[]> {
    return this.indicatorModel.find().exec();
  }

  async findByType(type: IndicatorType): Promise<Indicator[]> {
    return this.indicatorModel.find({ type }).exec();
  }

  async findOne(type: IndicatorType, date: string): Promise<Indicator> {
    return this.indicatorModel.findOne({ type, date }).exec();
  }
}
