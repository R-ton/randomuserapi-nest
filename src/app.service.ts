import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { response } from 'express';
interface HttpConfig{
  host: string;
  port: number;
  api: string;
}


export interface Users{
  name: Object;
  email: String;
  login: Object;
  registered: Object;
  picture: Object;
}
@Injectable()
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

  getUsers(seed: String,nat: String, count: Number): Promise<Users[]>{
    
   const promise = axios.get(this.iApi+'?seed='+this.iSeed+'&nat='+nat+'&results='+count);
   const dataPromise: Promise<Users[]> = promise.then((response)=> response.data.results);
   return dataPromise;
  }

  getAllUsers(): Promise<Users[]>{
    const promise = axios.get(this.iApi+'?seed='+this.iSeed);
    const dataPromise = promise.then((response)=> response.data.results);
    return dataPromise;
  }






}
