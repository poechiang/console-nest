import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './aritcle.controller';
import { Article, ArticleSchema } from './article.schema';
import { BlogService } from './blog.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Article.name, schema: ArticleSchema },
        ]),
    ],
    controllers: [ArticleController],
    providers: [BlogService],
})
export class BlogModule {}
