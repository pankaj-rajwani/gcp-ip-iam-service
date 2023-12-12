import { DynamicObject } from './common.dto';

export interface UpdateCutsomClaimsForUsersInput {
  uid: string;
  customClaims: DynamicObject;
}
