import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Logger,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { BaseController } from 'src/common/base.controller';
import { UserNotExistException } from 'src/common/lib/exceptions';
import { User } from './user.schema';
import { UserService } from './user.service';

const logger = new Logger('USER', { timestamp: true });
@Controller('/auth/users')
export class UserController extends BaseController {
    constructor(private readonly user: UserService) {
        super();
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
    /**
     * 用户登录
     */
    @ApiTags('User')
    @ApiOperation({ summary: '用户登录' })
    @Post('/signin')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req) {
        const { passd: _, ...user } = req.user;
        Logger.log(`The user ${user.uname} loggin the system!`);
        return user;
    }

    //Get / protected
    @UseGuards(AuthenticatedGuard)
    @Post('/protected')
    getHello(@Req() req): string {
        return req.user;
    }

    //Get / logout
    @Get('/signout')
    logout(@Req() req): string {
        req.session.destroy();
        return 'The user session has ended';
    }
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
}
