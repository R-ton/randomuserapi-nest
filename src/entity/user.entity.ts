import { Expose } from "class-transformer";

//Class Users as entity
export const GROUP_ALL_USERS = 'group_all_users';
export class Users{
    @Expose({ groups: [GROUP_ALL_USERS] })
    name: Object;
    @Expose({ groups: [GROUP_ALL_USERS] })
    email: String;
    @Expose({ groups: [GROUP_ALL_USERS] })
    login: Object;
    @Expose({ groups: [GROUP_ALL_USERS] })
    registered: Object;
    @Expose({ groups: [GROUP_ALL_USERS] })
    picture: Object;
}