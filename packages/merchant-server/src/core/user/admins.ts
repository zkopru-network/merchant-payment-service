import {AdminRepository} from "../infra/database/admin-repository";
import {Logger} from "@nestjs/common";

export class Admins {
    constructor(private adminRepository: AdminRepository) {
    }

    async create(email: string, passphrase: string) {
        await this.adminRepository.createAdmin(email, passphrase);
    }

    async get(email: string, passphrase: string) {
        const admin = await this.adminRepository.getAdmin(email);
        if (passphrase == admin.passphrase) {
            return admin
        }
        throw new Error("invalid password")
    }

    async delete(email: string, passphrase: string) {
        const admin = await this.get(email, passphrase)
        if (passphrase == admin.passphrase)
            return await this.adminRepository.deleteAdmin(email);
        throw new Error("invalid password")
    }
}