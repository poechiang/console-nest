import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ResponseResult } from 'src/common/types/enum.interface';
import { BlogService } from './blog.service';

@Controller('/blog/articles')
export class ArticleController {
    constructor(private readonly blogSrv: BlogService) {}

    @Get()
    getArticles(): Observable<IResponseBody<any>> {
        return of({
            meta: { code: 200, result: ResponseResult.SUCCESS },
            payload: { data: this.blogSrv.getArticles() },
        });
    }
}
