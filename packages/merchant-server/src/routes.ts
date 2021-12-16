import {Routes} from "nest-router";
import {ApiV1Module} from "./v1/api-v1.module";

export const routes: Routes = [
    {
        path: "/v1",
        module: ApiV1Module
    },
] as Routes;
