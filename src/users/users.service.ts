/* eslint-disable prettier/prettier */
import {
  ClassSerializerInterceptor,
  Injectable,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UsersDetail } from 'src/entity/userdetail.entity';
import { GROUP_ALL_USERS, Users } from '../entity/user.entity';
interface HttpConfig {
  host: string;
  port: number;
  api: string;
}



@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersService {
  private iHttp: HttpConfig;
  private iApi: string;
  private iSeed: string;
  constructor(private configService: ConfigService) {
    this.iHttp = this.configService.get<HttpConfig>('http');
    this.iApi = this.iHttp.api;
    this.iSeed = '<R-ton>';
  }
  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Return password strength 
   * @param pwd 
   * @returns Strength value
   */
  getPwdStrength(pwd: string): number{
    let val = 0;
    switch (true) {
    // ne contient que des chiffres
    case /^[0-9]*$/.test(pwd): 
      val=1;
      break;
    // ne contient que des lettres (majuscules ou minuscules)
    case /^[a-z]+$/.test(pwd) || /^[A-Z]+$/.test(pwd): 
      val=2;
      break;
    // contient à la fois des lettres minuscules et majuscules
    case /^[a-zA-Z]+$/.test(pwd): 
      val=4
      break
    // contient des chiffres et des lettres (majuscules ou minuscules)
    case /^[a-z0-9]*$/.test(pwd) ||  /^[A-Z0-9]*$/.test(pwd):
      val=3;
      break;
    // contient des chiffres et des lettres minuscules et majuscules
    case /^[a-zA-Z0-9]*$/.test(pwd):
      val=5;
      break;
    // ne contient que des caractères spéciaux
    case /^[^a-zA-Z0-9]*$/.test(pwd):
      val=6;
      break;
    // contient des caractères spéciaux et au moins deux autres types de caractères parmi 
    // la liste suivante : chiffres, lettres majuscules ou lettres minuscules
    case /^[^a-zA-Z0-9]*[a-z0-9]{2,}$/.test(pwd) || /^[^a-zA-Z0-9]*[A-Z0-9]{2,}$/.test(pwd):
      val=8;
      break;
    // contient des caractères spéciaux et au moins un autre type de caractères parmi : 
    // chiffres, lettres majuscules ou lettres minuscules
    case /^[^a-zA-Z0-9]*[a-z0-9]{1,}$/.test(pwd) || /^[^a-zA-Z0-9]*[A-Z0-9]{1,}$/.test(pwd):
      val=7;
    break;
    // contient des caractères spéciaux, des chiffres, des lettres majuscules et des lettres 
    // minuscules
    case /^[^a-zA-Z0-9]*[A-Za-z0-9]+$/.test(pwd):
      val=9;
    break;
    
    default:
      break;
  }
  return val;
  }

  getDynamicProperty(prop: Users){
    const promise = this.getUsers(this.iSeed,'*',500,'');
    const dataPromise: Promise<void | Users[]> = promise.then((response) => {
      let data: Array<Users> = response;
    
      data = data.filter(x => x.equals(prop));
      console.log(data)
      return data;
    },(error)=>{
      console.log(error)
      return error;
    });
    return dataPromise;
  }

  getUsersByUUID(uuid: string): Promise<Users[]>{
    const promise = this.getUsers(this.iSeed,'*',500,'');
    const dataPromise: Promise<Users[]> = promise.then((response) => {
      let data: Array<Users> = response;
    
      data = data.filter(x =>{ 
        return x.login.uuid = uuid
      });

      data.map((item: UsersDetail)=>{
        item.login.passwordstrength = this.getPwdStrength(item.login.password)
        return {
          gender: item.gender,
          name: item.name,
          location: item.location,
          email: item.email,
          login: item.login,
          dob: item.dob,
          registered: item.registered,
          phone: item.phone,
          cell: item.cell,
          picture: item.picture,
          nat: item.nat
        };
      })
      
      return data;
    },(error)=>{
      console.log(error)
      return error;
    });
    return dataPromise;
    // const promise = axios.get(this.iApi + '?seed=' + this.iSeed+'&results=500&nat=FR&inc=login');
    // const dataPromise: Promise<Users[]> = promise.then((response) => {
    //   let data: Array<Users> = response.data.results;
    //   // console.log(uuid)
    //   data = data.filter(x => {
    //     return x.login.uuid = uuid
    //   });
    //   console.log(data)
    //   return data;
    // });
    // return dataPromise;
  }

  @SerializeOptions({
    groups: [GROUP_ALL_USERS],
  })
  getUsers(seed: string, nat: string, count: number, append?: string): Promise<Users[]> {
    const promise = axios.get(
      this.iApi + '?seed=' + this.iSeed + '&nat=' + nat + '&results=' + count+append
    );
    const dataPromise: Promise<Users[]> = promise.then((response) => {
      let data = response.data.results;
      // console.log(data)
      // data = plainToInstance(Users, data);
      return data;
    },(error)=>{
      console.log(error)
      return error;
    });
    return dataPromise;
  }

  @SerializeOptions({
    groups: [GROUP_ALL_USERS],
  })
  getAllUsers(): Promise<Partial<Users>[]> {
    const promise = this.getUsers(this.iSeed,'FR',500,'');
    const dataPromise: Promise<Partial<Users>[]> = promise.then((response) => {
      let data: Partial<Users>[] = response;
      console.log(data)
      data = data.map((item: Users) => {
        return {
          name: item.name,
          email: item.email,
          login: item.login,
          registered: item.registered,
          picture: item.picture,
        };
      });
      return data;
    });
    return dataPromise;
  }
}
