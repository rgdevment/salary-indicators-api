import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IndicatorsService } from './indicators.service';
import { IndicatorsController } from './indicators.controller';
import { IndicatorsRepository } from './indicators.repository';
import { Indicator, IndicatorSchema } from './schemas/indicator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Indicator.name, schema: IndicatorSchema }]),
  ],
  controllers: [IndicatorsController],
  providers: [IndicatorsService, IndicatorsRepository],
})
export class IndicatorsModule {}
