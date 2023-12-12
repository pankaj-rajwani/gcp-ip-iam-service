import { EnrolledFactors } from './enrolledFactors.dto';
import { DynamicObject } from './common.dto';

export interface CreateIdpUserInput {
  email: string;
  emailVerified: boolean;
  password: string;
  displayName: string;
  multiFactor?: EnrolledFactors;
  customClaims?: DynamicObject;
}
