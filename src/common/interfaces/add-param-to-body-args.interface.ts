import { TransformTypesEnum } from '@common/constants/transform-types.enum';

export interface AddParamToBodyArgsInterface {
  paramName: string;
  transformTo?: TransformTypesEnum;
}
