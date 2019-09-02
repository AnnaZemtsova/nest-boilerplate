import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto} from "./user.dto";


@Controller('users')
export class UsersController {
    constructor(private userService: UserService){}

    @Post('/signin')
    async getUser(@Body() userDto: UserDto){
        return this.userService.getUser(userDto);
    }


    @Post('/signup')
    async createUser(@Body() user: UserDto){
        return this.userService.createUser(user);
    }
}
