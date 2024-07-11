import { Module } from '@nestjs/common';
import { IndicatorModule } from './indicators/indicator.module';
import { MongooseModule } from '@nestjs/mongoose';

console.log('MONGODB_URI:', process.env.MONGODB_URI);

@Module({
  imports: [IndicatorModule, MongooseModule.forRoot(process.env.MONGODB_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
