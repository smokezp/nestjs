import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource, Not } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniqueValidatorConstraint implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}
  validate(value: any, args: ValidationArguments) {
    const whereCondition: FindOptionsWhere<any> = {
      [args.property]: value,
    };
    const id = args.object['id'];
    if (id) {
      whereCondition['id'] = Not(id);
    }
    return this.dataSource
      .getRepository(args.constraints[0])
      .findOne({
        where: whereCondition,
      })
      .then((entity) => {
        return !entity;
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} with value "${validationArguments.value}" already exist, this field is unique`;
  }
}
