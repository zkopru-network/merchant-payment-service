import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField:"email",
            passwordField:"passphrase"
        });
    }

    async validate(email: string, passphrase: string): Promise<any> {
        const user = await this.authService.validateUser(email, passphrase);
        Logger.warn(JSON.stringify(user))
        if (user && user.passphrase === passphrase) {
            return {
                id: user.id,
                email: user.email
            }
        }
        throw new UnauthorizedException();
    }
}
