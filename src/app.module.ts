import { Module } from '@nestjs/common';
import { IndicatorModule } from './indicators/indicator.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DbConnectionInterceptor } from './common/interceptors/db-connection.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

console.log('MONGODB_URI:', process.env.MONGODB_URI);

@Module({
  imports: [IndicatorModule, MongooseModule.forRoot(process.env.MONGODB_URI)],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DbConnectionInterceptor,
    },
  ],
})
export class AppModule {}
