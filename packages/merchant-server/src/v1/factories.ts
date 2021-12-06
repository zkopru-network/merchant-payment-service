import {ConfigService} from "@nestjs/config";
import {StoreRepository} from "../core/infra/database";
import {Purchase, Stock, Store} from "../core";
import {ZkopruWalletImpl} from "../infra/zkopru/wallet";
import Web3 from "web3";
import {SQLiteConnector} from "@zkopru/database/src/connectors/sqlite";
import {schema} from "@zkopru/database/src";
import {AdminRepository} from "../core/infra/database/admin-repository";
import {Admins} from "../core/user";
import {Admin} from "../core/entities/admin";

export const storeFactory = {
    provide: 'STORE',
    useFactory: (configService: ConfigService) => {
        const repository = new StoreRepository({
            type: configService.get<"sqlite" | "mysql" | "postgres">("database.type"),
            database: configService.get<string>("database.url"),
            entities: [Stock, Purchase],
            synchronize: true
        });
        return new Store(repository, configService.get<string>("coordinatorUrl"))
    },
    inject: [ConfigService]
};

export const adminFactory = {
    provide: 'ADMIN',
    useFactory: (configService: ConfigService) => {
        const repository = new AdminRepository(
            {
                type: configService.get<"sqlite" | "mysql" | "postgres">("database.type"),
                database: configService.get<string>("database.url"),
                entities: [Stock, Purchase, Admin],
                synchronize: true
            }
        )
        return new Admins(repository);
    },
    inject: [ConfigService]
}

export const walletFactory = {
    provide: 'WALLET',
    useFactory: async (configService: ConfigService) => {
        // todo: add configuration
        const web3 = new Web3(configService.get<string>("blockchainUrl"));
        const l1Account = web3.eth.accounts.privateKeyToAccount(
            configService.get<string>("l1.privateKey")
        )
        const mockupDB = await SQLiteConnector.create(schema, ':memory:')
        return new ZkopruWalletImpl(
            web3.currentProvider as any,
            l1Account.address,
            mockupDB,
            l1Account.privateKey,
            [],
            [],
            configService.get<string>('snarkKeyPath'),
            configService.get<string>('snarkKeyCid')

        );
    },
    inject: [ConfigService]
}
