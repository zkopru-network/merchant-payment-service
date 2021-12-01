import {Inject, Injectable} from '@nestjs/common';
import {Admins} from "@merchant-payment-service/sdk/lib/user";
import {Admin} from "@merchant-payment-service/sdk/lib/entities/admin";

export type User = any;

@Injectable()
export class UserService {
    constructor(@Inject("ADMIN") private admin:Admins) {
    }

    async findOne(username: string, passphrase: string): Promise<Admin | undefined> {
        return await this.admin.get(username, passphrase);
    }
    async create(username: string, passphrase: string) {
        return await this.admin.create(username, passphrase);
    }
    async delete(username: string, passphrase: string) {
        return await this.admin.delete(username, passphrase);
    }
}
