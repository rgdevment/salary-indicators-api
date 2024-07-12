import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IndicatorService } from './indicator.service';
import { IndicatorController } from './indicator.controller';
import { IndicatorRepository } from './indicator.repository';
import { Indicator, IndicatorSchema } from './schemas/indicator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Indicator.name, schema: IndicatorSchema },
    ]),
  ],
  controllers: [IndicatorController],
  providers: [IndicatorService, IndicatorRepository],
  exports: [IndicatorRepository],
})
export class IndicatorModule {}
