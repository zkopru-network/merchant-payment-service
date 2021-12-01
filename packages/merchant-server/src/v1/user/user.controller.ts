import {Controller, Request, Post, UseGuards, Get, Body, Inject, Delete} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from "../auth/auth.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiTags} from "@nestjs/swagger";

@Controller("user")
@ApiTags("user")
export class UserController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
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
