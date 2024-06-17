import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IndicatorType } from '../indicator-type.enum';

@Schema()
export class Indicator extends Document {
  @Prop({ type: String, enum: IndicatorType, required: true })
  type: IndicatorType;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  date: Date;
}

export const IndicatorSchema = SchemaFactory.createForClass(Indicator);
