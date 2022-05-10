import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Users } from 'src/entity/user.entity';
import { UsersDetail } from 'src/entity/userdetail.entity';
import configuration from '../config/configuration';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { UsersService } from './users.service'
describe('UserController', () => {
  let userController: UsersController;
  let userService: UsersService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports:[
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true
          }),
            UsersModule
      ],
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();

    userController = app.get<UsersController>(UsersController);
    userService = app.get<UsersService>(UsersService);
  });

  describe('root', () => {
    it('should return a list of users', () => {
      return userController.getAllUsers().then(data => {
        expect(data).toBeDefined();
      });
    });
  });

  describe('dynamicProperty', () => {
    it('should return a list of users with attributes equal to property value', async() =>  {
    let property :Partial<UsersDetail> = {
      gender: 'female',
      location: {
        city: 'Lausanne'
      },
    }
    const dynamicPropSpy = jest.spyOn(userService, 'getDynamicProperty');
      expect(await userController.getDynamicProperty(property)).toBeDefined();
      expect(dynamicPropSpy).toHaveBeenCalledWith(property);
    });
  });
});

