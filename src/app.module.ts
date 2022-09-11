import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AES, enc, mode, pad } from 'crypto-js';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { DB } from './common/config';
import { UserModule } from './user/user.module';

const { user, password, url, aseKey } = DB;
const passd = AES.decrypt(password, enc.Utf8.parse(aseKey), {
    mode: mode.ECB,
    padding: pad.Pkcs7,
}).toString(enc.Utf8);

@Module({
    imports: [
        BlogModule,
        UserModule,
        AuthModule,
        MongooseModule.forRoot(`mongodb+srv://${user}:${passd}@${url}`),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
