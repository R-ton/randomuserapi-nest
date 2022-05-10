import { ClassSerializerInterceptor, Injectable, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { plainToClass, plainToInstance } from 'class-transformer';
import {GROUP_ALL_USERS, Users} from './entity/user.entity';
interface HttpConfig{
  host: string;
  port: number;
  api: string;
}



@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }
}
