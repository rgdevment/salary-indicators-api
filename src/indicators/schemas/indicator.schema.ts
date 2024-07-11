import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Indicator extends Document {
  @Prop({ required: true })
  indicator: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  value_to_word: string;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true, type: Date })
  update_at: Date;
}

export const IndicatorSchema = SchemaFactory.createForClass(Indicator);
