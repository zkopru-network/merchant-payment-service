import {Connection, createConnection, getConnection, Repository} from "typeorm";
import {ConnectionOptions} from "typeorm/connection/ConnectionOptions";
import {Admin} from "../../entities/admin";

export class AdminRepository {
    constructor(private option: ConnectionOptions) {
    }


    public async getAdmin(email: string): Promise<Admin> {
        const repository = await this.getAdminRepository();
        return await repository.findOne({where: {email}})
    }

    public async deleteAdmin(email: string) {
        const repository = await this.getAdminRepository();
        const admin = await this.getAdmin(email);
        return await repository.delete(admin);
    }

    public async createAdmin(email: string, passphrase: string) {
        const repository = await this.getAdminRepository();
        return repository.create({
            email,
            passphrase
        });
    }

    private async getAdminRepository(): Promise<Repository<Admin>> {
        const connection = await this.getConnection();
        return connection.getRepository(Admin);
    }

    private async getConnection(): Promise<Connection> {
        const currentConnectionName = "default";
        try {
            return getConnection(currentConnectionName);
        } catch (ConnectionNotFoundError) {
            return await createConnection({...this.option, name: currentConnectionName});
        }
    }
}