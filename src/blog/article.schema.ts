import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ autoCreate: true })
export class Article {
    @Prop({ unique: true, required: true })
    id: string;
    @Prop()
    catagory?: string;

    @Prop({ required: true })
    title?: string;
    @Prop()
    content?: string;
    @Prop({ type: [String] })
    tags?: string[];

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;

    @Prop()
    draft?: boolean;

    @Prop({ default: 1, type: Number })
    state?: number = 1;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
