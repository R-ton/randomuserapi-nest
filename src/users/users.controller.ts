import { Controller, Get, OnModuleInit, Param, Query } from '@nestjs/common';
import { ContextIdFactory } from '@nestjs/core';
import { Users } from '../entity/user.entity';
import { UsersService } from './users.service';

interface Response {
  code: number;
  data: Array<Object>;
  message: string;
}

@Controller('users')
export class UsersController implements OnModuleInit {
  private iResp: Response;
  constructor(private readonly userService: UsersService) {
    this.iResp = {
      code: 200,
      data: null,
      message: 'Success !!',
    };
  }
  onModuleInit() {
    // throw new Error('Method not implemented.');
    this.responseType()
  }

  responseType(){

  }

  @Get('')
  async getAllUsers() {
    await this.userService.getAllUsers().then(
      (success) => {
        // console.log(success.data.results)
        const result = success;
        this.iResp.data = result;
      },
      (error) => {
        this.iResp.data = error;
        this.iResp.code = 500;
      },
    );
    return this.iResp;
  }

  @Get('?')
  async getDynamicProperty(@Query() property){
    console.log(property)
    await this.userService.getDynamicProperty(property).then(
      (success: Users[]) => {
        
        const result = success;
        this.iResp.data = result;
      },
      (error) => {
        this.iResp.data = error;
        this.iResp.code = 500;
        this.iResp.message = 'Error !!';
      },
    );
    return this.iResp;
  }


  @Get(':uuid')
  async getUserByUUID( @Param('uuid') uuid: string){
    await this.userService.getUsersByUUID(uuid).then(
      (success: Users[]) => {
        // console.log(success.data.results)
        const result = success;
        this.iResp.data = result;
      },
      (error) => {
        this.iResp.data = error;
        this.iResp.code = 500;
      },
    );
    return this.iResp;
  }

  @Get('import/:seed/:country/:count')
  async getUser(
    @Param('seed') seed: string,
    @Param('country') country: string,
    @Param('count') count: number,
  ) {
    await this.userService.getUsers(seed, country, count).then(
      (success: Users[]) => {
        // console.log(success.data.results)
        const result = success;
        this.iResp.data = result;
      },
      (error) => {
        this.iResp.data = error;
        this.iResp.code = 500;
      },
    );
    return this.iResp;
  }

 
}
