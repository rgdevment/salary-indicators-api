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

  async testConnection(): Promise<boolean> {
    try {
      await this.indicatorModel.estimatedDocumentCount().exec();
      return true;
    } catch (error) {
      console.error('Error al verificar la conexión a la base de datos:', error);
      throw new Error('Fallo al verificar la conexión a la base de datos');
    }
  }

  async findLastIndicatorOfMonth(indicator: IndicatorEnum): Promise<Indicator> {
    const now = new Date();
    const endOfMonth = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)
      .toISOString()
      .split('T')[0];

    return this.indicatorModel
      .findOne({
        indicator,
        date: { $lte: endOfMonth },
      })
      .sort({ date: -1 })
      .exec();
  }

  async findAverageIndicatorOfMonth(indicator: IndicatorEnum): Promise<number> {
    const now = new Date();
    const startOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0),
    );
    const endOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999),
    );
    const results = await this.indicatorModel.aggregate([
      {
        $match: {
          indicator,
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          average: { $avg: '$value' },
        },
      },
    ]);

    if (results.length > 0) {
      const result = results[0].average;
      const decimalString = result.toString();
      return parseFloat(parseFloat(decimalString).toFixed(2));
    }

    return null;
  }

  async findFirstIndicatorOfMonth(
    indicator: IndicatorEnum,
  ): Promise<Indicator> {
    const now = new Date();
    const startOfMonth = new Date(now.getUTCFullYear(), now.getUTCMonth(), 1)
      .toISOString()
      .split('T')[0];
    return this.indicatorModel
      .findOne({
        indicator,
        date: { $lte: startOfMonth },
      })
      .sort({ date: -1 })
      .exec();
  }

  async findCurrentDayOrLastRecord(
    indicator: IndicatorEnum,
  ): Promise<Indicator> {
    const formattedDate = new Date().toISOString().split('T')[0];

    return await this.indicatorModel
      .findOne({
        indicator,
        date: { $lt: formattedDate },
      })
      .sort({ date: -1 })
      .exec();
  }
}
