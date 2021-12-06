import {HttpException, Inject, Injectable} from '@nestjs/common';
import {Admins} from "../../core/user";
import {Admin} from "../../core/entities/admin";

export type User = any;

@Injectable()
export class UserService {
    constructor(@Inject("ADMIN") private admin: Admins) {
    }

    async findOne(username: string, passphrase: string): Promise<Admin | undefined> {
        return await this.admin.get(username, passphrase);
    }

    async create(username: string, passphrase: string) {
        try {
            return await this.admin.create(username, passphrase);
        } catch (e) {
            throw new HttpException(e.message, 400);
        }
    }

    async delete(username: string, passphrase: string) {
        return await this.admin.delete(username, passphrase);
    }
}
