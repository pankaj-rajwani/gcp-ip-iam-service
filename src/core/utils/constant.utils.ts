export class IdentityPlatformConstants {
  public static USER_NOT_FOUND_AUTH_ERROR_CODE = 'auth/user-not-found';
  public static TOKEN_EXPIRED_AUTH_ERROR_CODE = 'auth/id-token-expired';
  public static TOKEN_REVOKED_AUTH_ERROR_CODE = 'auth/id-token-revoked';
  public static USER_ALREADY_EXISTS_AUTH_ERROR_CODE =
    'auth/email-already-exists';

  public static INVALID_USER_ID_ERROR_MSG = 'User Id cannot be null or empty';
  public static INVALID_CUSTOM_CLAIM_ERROR_MSG =
    'Custom Claim object cannot be empty';
  public static DISPLAY_NAME_NOT_PRESENT_ERROR_MSG =
    "'displayName' property not present in the input object";
  public static EMAIL_NOT_PRESENT_ERROR_MSG =
    "'email' property not present in the input object";
  public static PASSWORD_NOT_PRESENT_ERROR_MSG =
    "'password' property not present in the input object";
  public static EMAIL_VERIFIED_NOT_PRESENT_ERROR_MSG =
    "'emailVerified' property not present in the input object";
  public static MULTI_FACTOR_NOT_PRESENT_ERROR_MSG =
    "'multiFactor' property not present in the input object";
  public static AT_LEAST_ONE_MFA_REQ_ERROR_MSG =
    'At least one MFA is required for creating user';
  public static INVALID_INPUT_OBJECT_ERROR_MSG =
    'Input object cannot be empty. Please enter some data to be updated';
  public static EMPTY_OR_NULL_TOKEN_STRING_ERROR_MSG =
    'Token cannot be null or empty';
  public static TOKEN_EXPIRED_ERROR_MSG =
    'INVALID TOKEN! The passed token has expired';
  public static TOKEN_REVOKED_ERROR_MSG =
    'TOKEN REVOKED! The passed token has been revoked by the Identity Platform';
  public static USER_ALREADY_EXISTS_ERROR_MSG =
    'User already exists with the mail provided. Please try again with new mail';
  public static MFA_PHONE_NUMBER_NOT_PRESENT_ERROR_MSG(idx: number) {
    return `Property 'phoneNumber' not present in the input object-${idx}`;
  }
  public static MFA_DISPLAY_NAME_NOT_PRESENT_ERROR_MSG(idx: number) {
    return `Property'displayName' not present in the input object-${idx}`;
  }
  public static MFA_FACTOR_ID_NOT_PRESENT_ERROR_MSG(idx: number) {
    return `Property 'factordId' not present in the input object-${idx}`;
  }
  public static INVALID_MFA_FACTOR_ID_ERROR_MSG(idx: number) {
    return `Invalid value for property 'factordId' assigned in the input object-${idx}. Expected value: 'phone'`;
  }
  public static USER_NOT_FOUND_ERROR_MSG(id: string) {
    return `No such user found! User doesn't exists with id-${id}`;
  }
}
