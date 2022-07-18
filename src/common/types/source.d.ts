declare interface ILooseObject {
    [x: string]: any;
}
declare interface IpageInfo {
    page: number;
    size: number;
    total: number;
}

declare interface IResponseMeta {
    code: number;
    result: 'success' | 'failure';
    errMsg?: string;
}

declare interface IResponsePayload<T = any> {
    data?: T | T[];
    page?: IPageInfo;
}

declare interface IResponseBody<T = any> {
    meta: IResponseMeta;
    payload: IResponsePayload<T>;
}
