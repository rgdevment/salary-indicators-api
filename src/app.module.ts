import { Module } from '@nestjs/common';
import { IndicatorsModule } from './indicators/indicators.module';
import { MongooseModule } from "@nestjs/mongoose";

console.log('MONGODB_URI:', process.env.MONGODB_URI);

@Module({
  imports: [
    IndicatorsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
