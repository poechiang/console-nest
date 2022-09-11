declare type LooseObject<T = any> = Partial<string, T>;
declare interface IPaginable {
    page?: number;
    size?: number;
}
declare interface IpageInfo extends IPaginable {
    total: number;
}

declare interface IResponseMeta {
    code: number;
    result: 'success' | 'failure' | 'exception';
    message?: string;
}

declare interface IResponseBody<T = any> {
    meta: IResponseMeta;
    payload?: T;
}

declare type ResponseBody<T = any> = Promise<IResponseBody<T>>;

declare interface IArticleQueryDTO extends IPaginable {
    startTime: number;
    endTime: number;
    keys: string | string[];
}

declare interface IError extends Error {
    code?: number;
    extra?: any;
}
