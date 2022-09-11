import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
    getArticles(params?: LooseObject) {
        const { id, keys, dateRange } = params || {};
        return { id, keys, dateRange, x: 123 };
    }
}
