import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/api/api.module';
import { Page } from 'src/page/entities/page.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page]), ApiModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
