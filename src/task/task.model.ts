import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({unique:true, required: true })
  title: string;

  @Prop({  required: true })
  description: string;

  @Prop({ required: true })
  due_date: string;

  @Prop({required:true})
  priority:string;

   @Prop({default:false})
   Completed_task:Boolean;

   @Prop({ required: true, enum: ['Work', 'Personal', 'Health & Fitness', 'Finance', 'Education', 'Home & Family', 'Shopping', 'Social & Entertainment', 'Urgent', 'Miscellaneous'] })
    category: string;

}
export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);

