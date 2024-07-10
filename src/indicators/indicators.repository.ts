import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Indicator } from './schema/indicator.schema';

@Injectable()
export class IndicatorsRepository {
  constructor(@InjectModel(Indicator.name) private readonly indicatorModel: Model<Indicator>) {}

  async findAll(): Promise<Indicator[]> {
    return this.indicatorModel.find().exec();
  }

  async findOne(type: string, date: string): Promise<Indicator> {
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Asegura formato YYYY-MM-DD
    return this.indicatorModel.findOne({
      indicator: type,
      date: formattedDate
    }).exec();
  }
}
