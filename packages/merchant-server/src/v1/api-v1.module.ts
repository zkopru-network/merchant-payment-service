import {Module} from "@nestjs/common";
import {StoreController} from "./store/store.controller";
import {StoreService} from "./store/store.service";
import {ConfigModule} from "@nestjs/config";
import configuration from "../config";
import {storeFactory, walletFactory} from "./factories";
import {WalletController} from "./wallet/wallet.controller";
import {WalletService} from "./wallet/wallet.service";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration],
    })],
    controllers: [StoreController, WalletController],
    providers: [StoreService, WalletService, storeFactory, walletFactory]
})
export class ApiV1Module {

}