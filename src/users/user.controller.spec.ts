import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Users } from 'src/entity/user.entity';
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
      expect(userController.getAllUsers()).toBeDefined();
    });
  });

//   describe('dynamicProperty', () => {
//     it('should return a list of users', async() =>  {
//     let property :Users = {
//         gender: 'female'
//         location: {
//             city: 'Lausanne'
//         }
//     }
//     jest.spyOn(userService, 'getDynamicProperty').mockImplementation(property)
//       expect(await userController.getDynamicProperty(property)).toBeDefined();
//     });
//   });
});
