import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authSrv: AuthService) {
        super({ usernameField: 'uname', passwordField: 'passd' });
    }
    async validate(name: string, pwd: string) {
        const user = await this.authSrv.validateUser(name, pwd);

        if (!user) {
            throw new UnauthorizedException();
        }
        const { passd, _id, uname, role, level, status } = user;
        return { _id, id: _id, uname, role, level, status, passd };
    }
}
