import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
    /**
     * 根据查询参数获取符合指定临街条件的文章列表
     * @param params { ILooseObject } 查询参数
     */
    getArticles(params?: ILooseObject) {
        const { id, keys, dateRange } = params || {};
        return { id, keys, dateRange };
    }
}
