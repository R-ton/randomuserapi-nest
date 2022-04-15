import { Controller, Get, Param } from '@nestjs/common';
import { AppService, Users } from './app.service';

interface Response{
  code: Number;
  data: Array<Object>;
  message: String;
}

@Controller()
export class AppController {
  private iResp: Response;
  constructor(private readonly appService: AppService) {
    this.iResp  = {
      code: 200,
      data: null,
      message: 'Success !!'
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/api/users/import/:seed/:country/:count')
  async getUser(@Param('seed') seed: string, @Param('country') country: string, @Param('count') count: Number){
    await this.appService.getUsers(seed,country,count).then((success)=>{
      // console.log(success.data.results)
      let result = success; 
      this.iResp.data = result;
    },(error)=>{
      this.iResp.data = error;
      this.iResp.code = 500;
    })
      return this.iResp;
  }

  @Get('/api/users')
  async getAllUsers(){
    await this.appService.getAllUsers().then((success)=>{
      // console.log(success.data.results)
      let result = success; 
      this.iResp.data = result;
    },(error)=>{
      this.iResp.data = error;
      this.iResp.code = 500;
    })
      return this.iResp;
  }
}
