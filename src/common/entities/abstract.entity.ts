import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
  })
  deletedAt?: Date;
}
