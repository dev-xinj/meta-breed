import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Page } from './page/entities/page.entity';
import { PageModule } from './page/page.module';
import { PostModule } from './post/post.module';

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
    PostModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
