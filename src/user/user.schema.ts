import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ autoCreate: true })
export class User {
    @Prop({ unique: true, required: true })
    uname: string;

    @Prop({ required: true })
    passd?: string;
    @Prop()
    photo?: string;

    @Prop(
        raw({
            firstName: { type: String },
            lastName: { type: String },
        }),
    )
    realName?: Record<'firstName' | 'lastName', string>;

    @Prop({ default: 'male' })
    gender?: 'male' | 'female' = 'male';

    @Prop()
    birthday?: Date;

    @Prop()
    phone?: string;

    @Prop()
    email?: string;

    @Prop()
    level: number;

    @Prop()
    role: string;

    @Prop({ default: 1, type: Number })
    status = 1;
}

export const UserSchema = SchemaFactory.createForClass(User);
