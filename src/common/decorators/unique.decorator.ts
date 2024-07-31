import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueValidatorConstraint } from '@common/validator-constraint/unique.validator-constraint';

export function Unique(
  // eslint-disable-next-line @typescript-eslint/ban-types
  entity: Function,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity.name],
      validator: UniqueValidatorConstraint,
    });
  };
}
