import {Injectable, Logger} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';
import {Admin} from "../../core/entities/admin";


@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<Admin> {
        return await this.usersService.findOne(username, pass);
    }

    async login(user: any) {
        const payload = {username: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async create(username: string, pass: string) {
        return await this.usersService.create(username, pass);
    }

    async delete(username: string, pass: string) {
        return await this.usersService.delete(username, pass);
    }

}
