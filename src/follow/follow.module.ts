import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './dto/entities/follow';

@Module({
  providers: [FollowService],
  controllers: [FollowController],
  imports: [TypeOrmModule.forFeature([Follow])]
})
export class FollowModule { }
