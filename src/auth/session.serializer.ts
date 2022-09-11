import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

type SerializeUserCallback = (err: Error, user: any) => void;
type DeserializeUserCallback = (err: Error, payload: string) => void;
@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: SerializeUserCallback): any {
        done(null, user);
    }
    deserializeUser(payload: any, done: DeserializeUserCallback): any {
        done(null, payload);
    }
}
