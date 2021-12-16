import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../user/user.module';
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [UsersModule, PassportModule, JwtModule.register(
        // todo: up secret to config file.
        {
            secret: "secret", signOptions: {expiresIn: '60s'},
        }
    )],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {
}
