import { Module } from '@nestjs/common';

import { CreateUserService } from './services/create-user.service';
import { User, UserSchema } from '@azure-event-ingestion-sample/modules/user';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [CreateUserService],
})
export class UserModule {}
