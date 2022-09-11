import { NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.schema';
/**
 * 用户不存在
 * @property statusCode default 404401
 */
class UserNotExistException extends NotFoundException {
    /**
     * 用户不存在
     */
    constructor(user?: Partial<User>) {
        super({ message: '指定用户不存在', statusCode: 404401, user });
    }
}

export { UserNotExistException };
