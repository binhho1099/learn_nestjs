import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    PostModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      // useNewUrlParse: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    }),
  ],
})
export class AppModule {}
