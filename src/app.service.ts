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
  private iHttp: HttpConfig;
  private iApi: String;
  private iSeed: string;
  constructor(private configService: ConfigService){
    this.iHttp = this.configService.get<HttpConfig>('http')
    this.iApi = this.iHttp.api;
    this.iSeed = 'R-ton';
  }
  getHello(): string {
    return 'Hello World!';
  }

  @SerializeOptions({
    groups: [GROUP_ALL_USERS],
  })
  getUsers(seed: String,nat: String, count: Number): Promise<Users[]>{
   const promise = axios.get(this.iApi+'?seed='+this.iSeed+'&nat='+nat+'&results='+count);
   const dataPromise: Promise<Users[]> = promise.then((response)=> {
     let data = response.data.results
    //  data = plainToInstance(Users,data);
    data =  data.map((item: Users)=>{
      return {name:item.name,email:item.email,login:item.login,registered:item.registered,picture:item.picture} 
    })
    return data;
    });
   return dataPromise;
  }

  getAllUsers(): Promise<Users[]>{
    const promise = axios.get(this.iApi+'?seed='+this.iSeed);
    const dataPromise = promise.then((response)=>{
      let data = response.data.results
      //  data = plainToInstance(Users,data);
      data =  data.map((item: Users)=>{
        return {name:item.name,email:item.email,login:item.login,registered:item.registered,picture:item.picture} 
      })
      return data;
    });
    return dataPromise;
  }






}
