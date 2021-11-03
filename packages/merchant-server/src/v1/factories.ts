import {ConfigService} from "@nestjs/config";
import {StoreRepository} from "@merchant-payment-service/sdk/lib/infra/database";
import {Purchase, Stock, Store} from "@merchant-payment-service/sdk";

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
