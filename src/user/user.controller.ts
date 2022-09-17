import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Logger,
    Param,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserNotExistException } from 'src/common/lib/exceptions';
import { User } from './user.schema';
import { UserService } from './user.service';

const logger = new Logger('USER', { timestamp: true });
@Controller('/users')
export class UserController {
    constructor(private readonly user: UserService) {}
    /**
     * 注册新用户
     */
    @ApiTags('User')
    @ApiOperation({ summary: '注册新用户' })
    @Post('/signup')
    async register(@Body() body): Promise<User> {
        try {
            const newUsr = await this.user.create(body);
            if (newUsr) {
                newUsr.passd = '······';
                return newUsr;
            }
        } catch ({ code, name, message, ...extra }) {
            if (name === 'MongoServerError' && code === 11000) {
                throw new InternalServerErrorException(
                    { statusCode: code, message, payload: extra.keyValue },
                    '数据库操作失败',
                );
            }
            throw new InternalServerErrorException(
                { statusCode: code, message },
                '未知错误',
            );
        }
    }

    /**
     * 根据用户id查询用户信息
     */
    @ApiTags('User')
    @ApiOperation({ summary: '根据用户id查询用户信息' })
    @Get('/:id')
    async getUser(@Param('id') uid: string): Promise<User> {
        const usr = await this.user.find(uid);
        if (!usr) {
            throw new UserNotExistException();
        }

        usr.passd = '······';
        return usr;
    }
}
