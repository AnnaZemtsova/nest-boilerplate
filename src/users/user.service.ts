import {BadRequestException, Inject, Injectable, InternalServerErrorException} from "@nestjs/common";
import {User} from "./user.entity";
import {UserDto} from "./user.dto";
import {Model} from 'mongoose';
import * as jwt from 'jsonwebtoken';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import { common } from '../config/config';

const bcrypt = require('bcryptjs');
const mongoose  = require('mongoose');

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: UserRepository) {}

    async getUser(userDto: UserDto){
        try{
            const user = await this.findByCredentials(userDto.email, userDto.password);
            if(user) {
                return await this.generateAuthToken(user);
            }else {
                throw new InternalServerErrorException("Internal server error");
            }
        }catch(e){
            throw new BadRequestException("Incorrect email or password");
        }
    }

    async createUser(userDto: UserDto): Promise<string>{
        const createdUser = new User();
        createdUser.name = userDto.name;
        createdUser.email = userDto.email;
        createdUser.password = userDto.password;
        const token = await this.generateAuthToken(createdUser);
        await this.bcryptPassword(createdUser);
        await this.userRepository.insert(createdUser);
        return token;
    }

    async generateAuthToken(user: User){
        return jwt.sign({user: JSON.stringify(user)}, common.secret, {expiresIn: '7 days'});
    }

    async findByCredentials(email: string, password: string){
        const user = await this.userRepository.findOne({email});
        if(!user){
            throw new Error('Unable to login');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Unable to login');
        }
        return user;
    }

    async bcryptPassword(user){
        user.password = await bcrypt.hash(user.password, 8);
        user._id = mongoose.Types.ObjectId();
    }


}
