import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { AddParamToBody } from '@common/decorators/add-param-to-body.decorator';
import { TransformTypesEnum } from '@common/constants/transform-types.enum';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this._userService.createUser(createUserDto);
  }

  @Get()
  async getUsers(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<UserEntity>> {
    return this._userService.paginate(query);
  }

  @Get(':id')
  async getUser(@Param('id') id: number): Promise<UserEntity> {
    return this._userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @AddParamToBody({
      paramName: 'id',
      transformTo: TransformTypesEnum.INT,
    })
    @Body()
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this._userService.updateUser(id, updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this._userService.deleteUser(id);
  }
}
