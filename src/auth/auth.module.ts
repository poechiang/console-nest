import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { AuthController } from './auth.controller';

@Module({
    imports: [UserModule, PassportModule.register({ session: true })],
    providers: [AuthService, LocalStrategy, SessionSerializer],
    controllers: [AuthController],
})
export class AuthModule {}
