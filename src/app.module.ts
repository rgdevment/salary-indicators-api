import { Module } from '@nestjs/common';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'node:path';
import { IndicatorModule } from './indicators/indicator.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    IndicatorModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, '/resources/i18n/'),
        watch: false,
      },
      resolvers: [new HeaderResolver([])],
    }),
  ],
  controllers: [],
})
export class AppModule {}
