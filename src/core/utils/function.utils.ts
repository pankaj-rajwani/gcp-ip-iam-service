export class FunctionUtils {
  public static checkNullOrEmptyString(value: string) {
    if (!value || value === null || value.length === 0) {
      return true;
    }

    return false;
  }

  public static checkIfObjectIsEmpty(obj: object) {
    if (Object.entries(obj).length === 0) {
      return true;
    }

    return false;
  }
}
