import {Module} from '@nestjs/common';

import {UserController} from './user.controller';
import {CreateUserService} from "./services/create-user.service";
import {User, UserSchema} from "@azure-event-ingestion-sample/modules/user";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UserController],
  providers: [CreateUserService],
})
export class UserModule {
}
