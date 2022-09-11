import { Module } from '@nestjs/common';
import { ArticleController } from './aritcle.controller';
import { BlogService } from './blog.service';

@Module({
    imports: [],
    controllers: [ArticleController],
    providers: [BlogService],
})
export class BlogModule {}
