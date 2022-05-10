import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

interface Response{
  code: Number;
  data: Array<Object>;
  message: String;
}

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService){}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  }
