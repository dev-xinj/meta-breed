import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiFacebookService } from './apiFacebook.service';

@Module({
  imports: [HttpModule],
  providers: [ApiFacebookService],
  exports: [ApiFacebookService],
})
export class ApiModule {}
