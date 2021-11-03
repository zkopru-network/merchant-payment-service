import {Module} from "@nestjs/common";
import {StoreController} from "./store/store.controller";
import {StoreService} from "./store/store.service";
import {ConfigModule} from "@nestjs/config";
import configuration from "../config";
import {storeFactory} from "./factories";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration],
    })],
    controllers: [StoreController],
    providers: [StoreService, storeFactory]
})
export class ApiV1Module {

}