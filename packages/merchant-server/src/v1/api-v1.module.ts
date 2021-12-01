import {Module} from "@nestjs/common";
import {StoreController} from "./store/store.controller";
import {StoreService} from "./store/store.service";
import {ConfigModule} from "@nestjs/config";
import configuration from "../config";
import {storeFactory, adminFactory, walletFactory} from "./factories";
import {UserController} from "./user/user.controller";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./user/user.module";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration],
    }), AuthModule, UsersModule],
    controllers: [StoreController, UserController],
    providers: [StoreService, storeFactory, adminFactory, walletFactory]
})
export class ApiV1Module {

}