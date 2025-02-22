import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  image: string; 

  @Prop({ required: true, unique: true })
  mobile: number; 

  @Prop()
  address: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  taskCreated: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  taskCompleted: Types.ObjectId[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
