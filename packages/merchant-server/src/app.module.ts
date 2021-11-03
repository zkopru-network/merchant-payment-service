import {Logger, MiddlewareConsumer, Module, OnApplicationBootstrap} from "@nestjs/common";
import {RouterModule} from "nest-router";
import {routes} from "./routes";
import {LoggerMiddleware} from "./middleware/logger.middleware";
import {ApiV1Module} from "./v1/ApiV1Module";

@Module({
    imports: [
        RouterModule.forRoutes(routes),
        ApiV1Module,
    ],
})
export class AppModule implements OnApplicationBootstrap {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes("*");
    }

    onApplicationBootstrap(): any {
    }
}
