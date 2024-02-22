import {Body, Controller, Delete, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {Public} from "../decorators/Public";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

const routeName = 'users'

@ApiTags(routeName)
@Controller(routeName)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
