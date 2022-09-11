import { ResponseResult } from 'src/common/types/enum.interface';

export abstract class BaseController {
    success<T = any>(payload: T, code?: number): IResponseBody<T> {
        return {
            meta: { code: code || 200, result: ResponseResult.SUCCESS },
            payload,
        };
    }
    failure({ code, message, extra }: IError): IResponseBody {
        return {
            meta: {
                code: code || 400,
                message,
                result: ResponseResult.FAILURE,
            },
            payload: extra,
        };
    }
}
