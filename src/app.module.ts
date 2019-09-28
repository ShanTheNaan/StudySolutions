import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SessionsModule } from './sessions/sessions.module';

//Fsv9ItT3VQFrl2ZY

@Module({
  imports: [SessionsModule, MongooseModule.forRoot('mongodb://Sadru:Fsv9ItT3VQFrl2ZY@studysolutionscluster-shard-00-00-0nqmh.gcp.mongodb.net:27017,studysolutionscluster-shard-00-01-0nqmh.gcp.mongodb.net:27017,studysolutionscluster-shard-00-02-0nqmh.gcp.mongodb.net:27017/Sessions?ssl=true&replicaSet=StudySolutionsCluster-shard-0&authSource=admin&retryWrites=true&w=majority')],
})
export class AppModule {}
