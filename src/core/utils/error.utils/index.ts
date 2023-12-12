import { ApplicationError } from './applicationError.utils';
import { IdentityPlatformConstants } from '../constant.utils';

export class ServerErrorCode extends ApplicationError {
  public static INVALID_USER_ID_ERROR = new ServerErrorCode(
    { name: 'INVALID_USER_ID_ERROR', status: 400 },
    IdentityPlatformConstants.INVALID_USER_ID_ERROR_MSG,
  );
  public static INVALID_CUSTOM_CLAIM_ERROR = new ServerErrorCode(
    { name: 'INVALID_CUSTOM_CLAIM_ERROR', status: 400 },
    IdentityPlatformConstants.INVALID_CUSTOM_CLAIM_ERROR_MSG,
  );
  public static NO_DISPLAY_NAME = new ServerErrorCode(
    { name: 'NO_DISPLAY_NAME', status: 400 },
    IdentityPlatformConstants.DISPLAY_NAME_NOT_PRESENT_ERROR_MSG,
  );
  public static NO_EMAIL = new ServerErrorCode(
    { name: 'NO_EMAIL', status: 400 },
    IdentityPlatformConstants.EMAIL_NOT_PRESENT_ERROR_MSG,
  );
  public static NO_PASSWORD = new ServerErrorCode(
    { name: 'NO_PASSWORD', status: 400 },
    IdentityPlatformConstants.PASSWORD_NOT_PRESENT_ERROR_MSG,
  );
  public static NO_EMAIL_VERIFIED = new ServerErrorCode(
    { name: 'NO_EMAIL_VERIFIED', status: 400 },
    IdentityPlatformConstants.EMAIL_VERIFIED_NOT_PRESENT_ERROR_MSG,
  );
  public static NO_MULTI_FACTOR = new ServerErrorCode(
    { name: 'NO_MULTI_FACTOR', status: 400 },
    IdentityPlatformConstants.MULTI_FACTOR_NOT_PRESENT_ERROR_MSG,
  );
  public static NO_ENROLLED_FACTORS = new ServerErrorCode(
    { name: 'NO_ENROLLED_FACTORS', status: 400 },
    IdentityPlatformConstants.AT_LEAST_ONE_MFA_REQ_ERROR_MSG,
  );
  public static INVALID_INPUT_OBJECT = new ServerErrorCode(
    { name: 'INVALID_INPUT_OBJECT', status: 400 },
    IdentityPlatformConstants.INVALID_INPUT_OBJECT_ERROR_MSG,
  );
  public static NULL_OR_EMPTY_TOKEN = new ServerErrorCode(
    { name: 'NULL_OR_EMPTY_TOKEN', status: 400 },
    IdentityPlatformConstants.EMPTY_OR_NULL_TOKEN_STRING_ERROR_MSG,
  );
  public static TOKEN_EXPIRED = new ServerErrorCode(
    { name: 'TOKEN_EXPIRED', status: 401 },
    IdentityPlatformConstants.TOKEN_EXPIRED_ERROR_MSG,
  );
  public static TOKEN_REVOKED = new ServerErrorCode(
    { name: 'TOKEN_REVOKED', status: 401 },
    IdentityPlatformConstants.TOKEN_REVOKED_ERROR_MSG,
  );
  public static USER_ALREADY_EXISTS = new ServerErrorCode(
    { name: 'USER_ALREADY_EXISTS', status: 401 },
    IdentityPlatformConstants.USER_ALREADY_EXISTS_ERROR_MSG,
  );
  public static NO_MFA_PHONE_NUMBER(idx: number) {
    new ServerErrorCode(
      { name: 'NO_MFA_PHONE_NUMBER', status: 400 },
      IdentityPlatformConstants.MFA_PHONE_NUMBER_NOT_PRESENT_ERROR_MSG(idx),
    );
  }
  public static NO_MFA_DISPLAY_NAME(idx: number) {
    new ServerErrorCode(
      { name: 'NO_MFA_DISPLAY_NAME', status: 400 },
      IdentityPlatformConstants.MFA_DISPLAY_NAME_NOT_PRESENT_ERROR_MSG(idx),
    );
  }
  public static NO_MFA_FACTOR_ID(idx: number) {
    new ServerErrorCode(
      { name: 'NO_MFA_FACTOR_ID', status: 400 },
      IdentityPlatformConstants.MFA_FACTOR_ID_NOT_PRESENT_ERROR_MSG(idx),
    );
  }
  public static INVALID_MFA_FACTORD_ID(idx: number) {
    new ServerErrorCode(
      { name: 'INVALID_MFA_FACTORD_ID', status: 400 },
      IdentityPlatformConstants.INVALID_MFA_FACTOR_ID_ERROR_MSG(idx),
    );
  }
  public static USER_NOT_FOUND(id: string) {
    new ServerErrorCode(
      { name: 'USER_NOT_FOUND', status: 400 },
      IdentityPlatformConstants.USER_NOT_FOUND_ERROR_MSG(id),
    );
  }
}
