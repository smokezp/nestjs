import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AddParamToBodyArgsInterface } from '@common/interfaces/add-param-to-body-args.interface';
import { TransformTypesEnum } from '@common/constants/transform-types.enum';

export const AddParamToBody = createParamDecorator(
  (args: AddParamToBodyArgsInterface, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    let value = req.params[args.paramName];
    switch (args.transformTo) {
      case TransformTypesEnum.INT:
        value = parseInt(value);
    }

    req.body[args.paramName] = value;
    return req;
  },
);
