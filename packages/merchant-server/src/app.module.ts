import {Logger, MiddlewareConsumer, Module, OnApplicationBootstrap} from "@nestjs/common";
import {RouterModule} from "nest-router";
import {routes} from "./routes";
import {LoggerMiddleware} from "./middleware/logger.middleware";

@Module({
    imports: [RouterModule.forRoutes(routes)],
})
export class AppModule implements OnApplicationBootstrap {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes("*");
    }

    onApplicationBootstrap(): any {
        Logger.log(`listening port: ${printListeningPort()}`);
    }
}


function printListeningPort(): number {
    if (!process.env.PORT) {
        return 3000;
    }
    return Number(process.env.PORT);
}