import { ExtractJwt, Strategy } from 'passport-jwt';
import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "secret",
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
