import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {adminFactory} from "../factories";

@Module({
    providers: [UserService,adminFactory],
    exports: [UserService]
})
export class UsersModule {}
