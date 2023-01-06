import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(Article.name) private ArticleModel: Model<ArticleDocument>,
    ) {}
    async getArticles(params): Promise<Article[]> {
        const { order, page_size, page_index } = params || {};

        return await this.ArticleModel.find({
            create: { $gt: page_index || 0 },
        })
            .sort({ createdAt: order })
            .limit(page_size);
    }
}
