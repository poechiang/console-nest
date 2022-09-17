import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Logger,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { LocalAuthGuard } from './local.auth.guard';

const logger = new Logger('AUTH', { timestamp: true });
@Controller('auth')
export class AuthController {
    constructor(private readonly user: UserService) {}
    @ApiTags('Auth')
    @UseGuards(AuthenticatedGuard)
    @Get('/me')
    async check(@Req() req) {
        return req.user;
    }

    /**
     * 用户登录
     */
    @ApiTags('Auth')
    @ApiOperation({ summary: '用户登录' })
    @Post('/signin')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req) {
        const { passd: _, ...user } = req.user;
        logger.log(`The user ${user.uname} loggin the system!`);
        return user;
    }

    @ApiTags('Auth')
    @Get('/signout')
    @UseGuards(AuthenticatedGuard)
    async logout(@Req() req) {
        const { uname } = req.user;
        logger.log(`The user ${uname} loggin the system!`);
        req.session.destroy();
    }

    /**
     * 注册新用户
     */
    @ApiTags('Auth')
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
