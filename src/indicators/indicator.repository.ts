import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Indicator } from './schemas/indicator.schema';
import { IndicatorEnum } from './indicator.enum';

@Injectable()
export class IndicatorRepository {
  constructor(
    @InjectModel(Indicator.name)
    private readonly indicatorModel: Model<Indicator>,
  ) {}

  async findOne(type: IndicatorEnum): Promise<Indicator> {
    const formattedDate = new Date().toISOString().split('T')[0];

    return await this.indicatorModel
      .findOne({
        indicator: type,
        date: { $lt: formattedDate },
      })
      .sort({ date: -1 })
      .exec();
  }
}
