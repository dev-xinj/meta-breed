import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { ApiFacebook } from 'src/page/apiFacebook.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Page]), HttpModule],
  controllers: [PageController],
  providers: [PageService, ApiFacebook],
})
export class PageModule {}
