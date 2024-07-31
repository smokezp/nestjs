import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { CreateUserDto } from '../dtos/create-user.dto';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(userData: CreateUserDto): Promise<UserEntity> {
    const salt = await genSalt(10);

    const hashedPassword = await hash(userData.password, salt);
    return this.save({
      ...userData,
      password: hashedPassword,
    });
  }

  private save(user: Partial<UserEntity>): Promise<UserEntity> {
    return this._userRepository.save(this._userRepository.create(user));
  }

  public async updateUser(
    id: number,
    body: UpdateUserDto,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.getUserById(id);

    return this.save({ id, ...user, ...body });
  }

  public async getUserById(id: number): Promise<UserEntity> {
    const user: UserEntity | null = await this._userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Could not find user with id: ${id}`);
    }
    return user;
  }

  public async getUserByUsername(username: string): Promise<UserEntity | null> {
    return await this._userRepository.findOne({
      where: { username },
    });
  }

  public async paginate(query: PaginateQuery): Promise<Paginated<UserEntity>> {
    return paginate(query, this._userRepository, {
      sortableColumns: ['id'],
    });
  }

  public async deleteUser(id: number): Promise<DeleteResult> {
    await this.getUserById(id);
    return this._userRepository.softDelete(id);
  }
}
