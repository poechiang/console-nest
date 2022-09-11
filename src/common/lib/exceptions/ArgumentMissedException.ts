import { BadRequestException } from '@nestjs/common';
/**
 * 参数值无效
 * @property statusCode default 400401
 */
class ArgumentMissedException extends BadRequestException {
    /**
     * 用户不存在
     */
    constructor(args?: LooseObject) {
        super(
            { message: '参数值无效', statusCode: 400401, payload: args },
            '无效的请求参数',
        );
    }
}

export { ArgumentMissedException };
