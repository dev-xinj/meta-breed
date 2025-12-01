import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Page } from './page/entities/page.entity';
import { PageModule } from './page/page.module';
import { ApiFacebook } from './page/apiFacebook.service';

@Module({
  imports: [
    PageModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'adminkm',
      database: 'smartTS',
      entities: [Page],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
