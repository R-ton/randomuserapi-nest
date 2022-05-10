import { Expose } from "class-transformer";
//Class Users as entity
export const GROUP_ALL_USERS = 'group_all_users';
import isEqual from 'lodash/isEqual';
import { Users } from "./user.entity";
interface Login{
    uuid: string;
    username: string;
    password: string;
    passwordstrength: number;
}

export class UsersDetail extends Users{
    @Expose({ groups: [GROUP_ALL_USERS] })
    gender: string;
    @Expose({ groups: [GROUP_ALL_USERS] })
    location: object;
    @Expose({ groups: [GROUP_ALL_USERS] })
    login: Login;
    @Expose({ groups: [GROUP_ALL_USERS] })
    dob: Object;
    @Expose({ groups: [GROUP_ALL_USERS] })
    phone: string;
    @Expose({ groups: [GROUP_ALL_USERS] })
    cell: string;
    @Expose({ groups: [GROUP_ALL_USERS] })
    nat: string;
    equals(obj: Object){ 
       return isEqual(this,obj)
    }
}