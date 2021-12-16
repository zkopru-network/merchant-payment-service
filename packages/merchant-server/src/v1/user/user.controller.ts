import {Controller, Request, Post, UseGuards, Get, Body, Inject, Delete, Logger} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from "../auth/auth.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiTags} from "@nestjs/swagger";
import {LocalStrategy} from "../auth/local.strategy";
import {LocalAuthGuard} from "../auth/local-auth.guard";

@Controller("user")
@ApiTags("user")
export class UserController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('signup')
    async signup(
        @Body() signupRequest: any) {
        return this.authService.create(
            signupRequest.email,
            signupRequest.passphrase
        )
    }

    @Delete('user/withdraw')
    async withdraw(
        @Body() deleteRequest: any) {
        return this.authService.delete(
            deleteRequest.email,
            deleteRequest.passphrase
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get('user/profile')
    async profile(@Request() req) {
        return req.user;
    }
}
