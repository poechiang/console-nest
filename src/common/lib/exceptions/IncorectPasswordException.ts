import { BadRequestException } from '@nestjs/common';
/**
 * 登录密码错误
 * @property statusCode default 404402
 */
class IncorectPasswordException extends BadRequestException {
    /**
     * [404402] 登录密码错误
     */
    constructor() {
        super(
            { message: '登录密码错误', statusCode: 404402 },
            '无效的请求参数',
        );
    }
}

export { IncorectPasswordException };
