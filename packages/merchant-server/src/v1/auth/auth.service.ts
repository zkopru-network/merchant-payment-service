import {Injectable} from '@nestjs/common';
import {UserService} from '../user/user.service';
import {JwtService} from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        return await this.usersService.findOne(username, pass);
    }

    async login(user: any) {
        const payload = {username: user.username, sub: user.userId};
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
