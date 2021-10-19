import {Module} from "@nestjs/common";
import {ProductsController} from "./products/products.controller";
import {ProductsService} from "./products/products.service";

@Module({
    controllers: [ProductsController],
    imports: [ProductsService]
})
export class ApiV1Module {

}