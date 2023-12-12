import { EnrolledFactors } from './enrolledFactors.dto';

export interface CreateIdpUserWithMfaInput {
  email: string;
  emailVerified: boolean;
  password: string;
  displayName: string;
  multiFactor: EnrolledFactors;
}
