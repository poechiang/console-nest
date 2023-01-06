import { Controller, Get, Query } from '@nestjs/common';
import {
    ApiOperation,
    ApiProperty,
    ApiSecurity,
    ApiTags,
} from '@nestjs/swagger';
import { Article } from './article.schema';
import { BlogService } from './blog.service';

class ArticleQueryDTO {
    @ApiProperty({ type: Number, description: '123456', required: false })
    startTime: number;
    @ApiProperty({ type: Number, required: false })
    endTime: number;
    @ApiProperty({ type: 'string|string[]', required: false })
    keys: string[] = [];
    @ApiProperty({ type: Number, minimum: 1, default: 1, required: false })
    page = 1;
    @ApiProperty({ type: Number, default: 10, required: false })
    size = 10;
}
@ApiSecurity('basic')
@Controller('/blog/articles')
export class ArticleController {
    constructor(private readonly blog: BlogService) {}

    /**
     * 根据查询参数获取符合指定临街条件的文章列表
     * @api {Get} /user/get getUserInfo
     * @apiGroup Blog/Article
     *
     * @param { LooseObject } params  查询参数
     */
    @ApiTags('Blog')
    @ApiOperation({ summary: '根据查询参数获取符合指定临街条件的文章列表' })
    @Get()
    async getArticles(@Query() query): Promise<Article[]> {
        console.log(query);
        return await this.blog.getArticles(query);
    }
}
