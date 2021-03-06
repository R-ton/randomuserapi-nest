import { Expose } from "class-transformer";
//Class Users as entity
export const GROUP_ALL_USERS = 'group_all_users';
import isEqual from 'lodash/isEqual';
interface Login{
    uuid: string;
    username: string;
    password: string;
    passwordstrength: number;
}

export class Users{
    @Expose({ groups: [GROUP_ALL_USERS] })
    name: Object;
    @Expose({ groups: [GROUP_ALL_USERS] })
    email: String;
    @Expose({ groups: [GROUP_ALL_USERS] })
    login: Login;
    @Expose({ groups: [GROUP_ALL_USERS] })
    registered: Object;
    @Expose({ groups: [GROUP_ALL_USERS] })
    picture: Object;

    equals(obj: Object){ 
       return isEqual(this,obj)
    }
}