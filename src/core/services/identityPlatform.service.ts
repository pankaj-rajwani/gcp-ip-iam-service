import * as admin from 'firebase-admin';
import { config, IdentityPlatformConstants } from '../utils/index';
import {
  MultiFactor,
  DynamicObject,
  CreateIdpUserInput,
  CreateIdpUserWithMfaInput,
  UpdateCutsomClaimsForUsersInput,
} from '../dto/index';
import { FunctionUtils, ServerErrorCode } from '../utils/index';

export class IdentityPlatformService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(config.idpConnectionConfig),
    });
  }

  async addCustomClaim(userId: string, customClaim: DynamicObject) {
    try {
      if (!FunctionUtils.checkNullOrEmptyString(userId)) {
        if (!FunctionUtils.checkIfObjectIsEmpty(customClaim)) {
          const response: any = await admin
            .auth()
            .setCustomUserClaims(userId, customClaim);
          return response;
        }
        throw ServerErrorCode.INVALID_CUSTOM_CLAIM_ERROR;
      }
      throw ServerErrorCode.INVALID_USER_ID_ERROR;
    } catch (error: any) {
      if (
        error.code === IdentityPlatformConstants.USER_NOT_FOUND_AUTH_ERROR_CODE
      ) {
        throw ServerErrorCode.USER_NOT_FOUND(userId);
      }
      throw error;
    }
  }

  async createUser(user: CreateIdpUserInput) {
    try {
      if (!user.email) {
        throw ServerErrorCode.NO_EMAIL;
      }
      if (!user.password) {
        throw ServerErrorCode.NO_PASSWORD;
      }
      if (!user.emailVerified) {
        throw ServerErrorCode.NO_EMAIL_VERIFIED;
      }
      if (!user.displayName) {
        throw ServerErrorCode.NO_DISPLAY_NAME;
      }
      const userRecord: any = await admin.auth().createUser(user);
      return userRecord;
    } catch (error: any) {
      if (
        error.code ===
        IdentityPlatformConstants.USER_ALREADY_EXISTS_AUTH_ERROR_CODE
      ) {
        throw ServerErrorCode.USER_ALREADY_EXISTS;
      }
      throw error;
    }
  }

  async createUserWithMfa(user: CreateIdpUserWithMfaInput) {
    try {
      if (!user.email) {
        throw ServerErrorCode.NO_EMAIL;
      }
      if (!user.password) {
        throw ServerErrorCode.NO_PASSWORD;
      }
      if (!user.emailVerified) {
        throw ServerErrorCode.NO_EMAIL_VERIFIED;
      }
      if (!user.displayName) {
        throw ServerErrorCode.NO_DISPLAY_NAME;
      }
      if (!user.multiFactor) {
        throw ServerErrorCode.NO_MULTI_FACTOR;
      }
      if (user.multiFactor && user.multiFactor.enrolledFactors.length === 0) {
        throw ServerErrorCode.NO_ENROLLED_FACTORS;
      } else {
        user.multiFactor.enrolledFactors.map((el: MultiFactor, idx: number) => {
          if (!el.displayName) {
            throw ServerErrorCode.NO_MFA_DISPLAY_NAME(idx);
          }
          if (!el.phoneNumber) {
            throw ServerErrorCode.NO_MFA_PHONE_NUMBER(idx);
          }
          if (!el.factorId) {
            throw ServerErrorCode.NO_MFA_FACTOR_ID(idx);
          }
          if (el.factorId !== 'phone') {
            throw ServerErrorCode.INVALID_MFA_FACTORD_ID(idx);
          }
        });
      }
      const userRecord: any = await admin.auth().createUser(user);
      return userRecord;
    } catch (error: any) {
      if (
        error.code ===
        IdentityPlatformConstants.USER_ALREADY_EXISTS_AUTH_ERROR_CODE
      ) {
        throw ServerErrorCode.USER_ALREADY_EXISTS;
      }
      throw error;
    }
  }

  async getUserById(uid: string) {
    try {
      if (!FunctionUtils.checkNullOrEmptyString(uid)) {
        const userRecord: any = await admin.auth().getUser(uid);
        return userRecord;
      }
      throw ServerErrorCode.INVALID_USER_ID_ERROR;
    } catch (error: any) {
      if (
        error.code === IdentityPlatformConstants.USER_NOT_FOUND_AUTH_ERROR_CODE
      ) {
        throw ServerErrorCode.USER_NOT_FOUND(uid);
      }
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      if (!FunctionUtils.checkNullOrEmptyString(email)) {
        const userRecord: any = await admin.auth().getUserByEmail(email);
        return userRecord;
      }
      throw ServerErrorCode.INVALID_USER_ID_ERROR;
    } catch (error: any) {
      if (
        error.code === IdentityPlatformConstants.USER_NOT_FOUND_AUTH_ERROR_CODE
      ) {
        throw ServerErrorCode.USER_NOT_FOUND(email);
      }
      throw error;
    }
  }

  async checkIfUserExists(email: string) {
    try {
      if (!FunctionUtils.checkNullOrEmptyString(email)) {
        await admin.auth().getUserByEmail(email);
        return true;
      }
      throw ServerErrorCode.INVALID_USER_ID_ERROR;
    } catch (error: any) {
      if (
        error.code === IdentityPlatformConstants.USER_NOT_FOUND_AUTH_ERROR_CODE
      ) {
        return false;
      }
      throw error;
    }
  }

  async updateUser(uid: string, data: DynamicObject) {
    try {
      if (!FunctionUtils.checkNullOrEmptyString(uid)) {
        if (!FunctionUtils.checkIfObjectIsEmpty(data)) {
          const userRecord: any = await admin.auth().updateUser(uid, data);
          return userRecord;
        }
        throw ServerErrorCode.INVALID_INPUT_OBJECT;
      }
      throw ServerErrorCode.INVALID_USER_ID_ERROR;
    } catch (error: any) {
      if (
        error.code === IdentityPlatformConstants.USER_NOT_FOUND_AUTH_ERROR_CODE
      ) {
        throw ServerErrorCode.USER_NOT_FOUND(uid);
      }
      throw error;
    }
  }

  async enrollMFAForUser(uid: string, data: MultiFactor[]) {
    try {
      if (!FunctionUtils.checkNullOrEmptyString(uid)) {
        if (data.length === 0) {
          throw ServerErrorCode.NO_ENROLLED_FACTORS;
        } else {
          data.map((el: MultiFactor, idx: number) => {
            if (!el.displayName) {
              throw ServerErrorCode.NO_MFA_DISPLAY_NAME(idx);
            }
            if (!el.phoneNumber) {
              throw ServerErrorCode.NO_MFA_PHONE_NUMBER(idx);
            }
            if (!el.factorId) {
              throw ServerErrorCode.NO_MFA_FACTOR_ID(idx);
            }
            if (el.factorId !== 'phone') {
              throw ServerErrorCode.INVALID_MFA_FACTORD_ID(idx);
            }
          });
        }
        const userRecord: any = await admin
          .auth()
          .updateUser(uid, { multiFactor: { enrolledFactors: data } });
        return userRecord;
      }
      throw ServerErrorCode.INVALID_USER_ID_ERROR;
    } catch (error: any) {
      if (
        error.code === IdentityPlatformConstants.USER_NOT_FOUND_AUTH_ERROR_CODE
      ) {
        throw ServerErrorCode.USER_NOT_FOUND(uid);
      }
      throw error;
    }
  }

  async updateCustomClaimsForUsers(data: UpdateCutsomClaimsForUsersInput[]) {
    try {
      data.map((el: UpdateCutsomClaimsForUsersInput) => {
        if (FunctionUtils.checkNullOrEmptyString(el.uid)) {
          throw ServerErrorCode.INVALID_USER_ID_ERROR;
        } else if (FunctionUtils.checkIfObjectIsEmpty(el.customClaims)) {
          throw ServerErrorCode.INVALID_CUSTOM_CLAIM_ERROR;
        }
      });
      const promises = data.map(
        async ({ uid, customClaims }) =>
          await admin.auth().setCustomUserClaims(uid, customClaims),
      );
      await Promise.all(promises);
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(token: string) {
    try {
      if (!FunctionUtils.checkNullOrEmptyString(token)) {
        const user = await admin.auth().verifyIdToken(token);
        return user;
      }
      throw ServerErrorCode.NULL_OR_EMPTY_TOKEN;
    } catch (error: any) {
      if (
        error.code === IdentityPlatformConstants.TOKEN_EXPIRED_AUTH_ERROR_CODE
      ) {
        throw ServerErrorCode.TOKEN_EXPIRED;
      } else if (
        error.code === IdentityPlatformConstants.TOKEN_REVOKED_AUTH_ERROR_CODE
      ) {
        throw ServerErrorCode.TOKEN_REVOKED;
      } else {
        throw error;
      }
    }
  }

  async updateMfaForUser(uid: string, newFactors: MultiFactor[]) {
    try {
      if (FunctionUtils.checkNullOrEmptyString(uid)) {
        throw ServerErrorCode.INVALID_USER_ID_ERROR;
      }
      newFactors.map((el: MultiFactor, idx: number) => {
        if (!el.displayName) {
          throw ServerErrorCode.NO_MFA_DISPLAY_NAME(idx);
        }
        if (!el.phoneNumber) {
          throw ServerErrorCode.NO_MFA_PHONE_NUMBER(idx);
        }
        if (!el.factorId) {
          throw ServerErrorCode.NO_MFA_FACTOR_ID(idx);
        }
        if (el.factorId !== 'phone') {
          throw ServerErrorCode.INVALID_MFA_FACTORD_ID(idx);
        }
      });
      const userRecord: any = await admin.auth().getUser(uid);

      const updatedMfaList =
        (userRecord.multiFactor &&
          userRecord.multiFactor.toJSON().enrolledFactors) ||
        [];

      return await admin.auth().updateUser(uid, {
        multiFactor: {
          enrolledFactors: [...updatedMfaList, ...newFactors],
        },
      });
    } catch (error: any) {
      if (
        error.code === IdentityPlatformConstants.USER_NOT_FOUND_AUTH_ERROR_CODE
      ) {
        throw ServerErrorCode.USER_NOT_FOUND(uid);
      }
      throw error;
    }
  }

  async removeMultiFactor(uid: string) {
    try {
      if (FunctionUtils.checkNullOrEmptyString(uid)) {
        throw ServerErrorCode.INVALID_USER_ID_ERROR;
      }
      return await admin.auth().updateUser(uid, {
        multiFactor: {
          enrolledFactors: null,
        },
      });
    } catch (error: any) {
      if (
        error.code === IdentityPlatformConstants.USER_NOT_FOUND_AUTH_ERROR_CODE
      ) {
        throw ServerErrorCode.USER_NOT_FOUND(uid);
      }
      throw error;
    }
  }
}
