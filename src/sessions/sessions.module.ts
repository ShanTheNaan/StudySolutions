import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { MongooseModule } from '@nestjs/mongoose'
import { SessionSchema } from './sessions.model';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Session', schema: SessionSchema}])
  ],
  controllers: [SessionsController],
  providers: [SessionsService]
})
export class SessionsModule {}
