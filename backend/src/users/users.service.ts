import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UsersExceptions} from "./users.exceptions";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const existingEmail = await this.findOneByEmail(createUserDto.email);

        if (existingEmail) {
            throw UsersExceptions.EmailAlreadyExists;
        }

        const cryptoPassword = await bcrypt.hash(createUserDto.password, 10);

        await this.usersRepository.save({...createUserDto, password: cryptoPassword});
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    async remove(id: number) {
        await this.usersRepository.delete(id);
    }

    findOneByEmail = (email: string) => {
        return this.usersRepository.findOne({where: {email}});
    }
}
