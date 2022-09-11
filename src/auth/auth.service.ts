import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
    IncorectPasswordException,
    UserNotExistException,
} from 'src/common/lib/exceptions';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    async validateUser(name: string, pwd: string): Promise<any> {
        const user = await this.userService.findByName(name);
        if (!user) {
            throw new UserNotExistException();
        }
        if (!(await bcrypt.compare(pwd, user.passd))) {
            throw new IncorectPasswordException();
        }
        return user;
    }
}
