import { ServerErrorCodeInput } from '../../dto/index';

// It contains the base error classes to extend from
export class ApplicationError extends Error {
  status: number;
  relatedInfo: string | undefined;
  route: string | undefined;

  constructor(
    errorCode: ServerErrorCodeInput,
    message: string | undefined = undefined,
    relatedInfo: string | undefined = undefined,
  ) {
    super(message);

    this.name = errorCode.name;
    this.status = errorCode.status;
    this.relatedInfo = relatedInfo;
  }
}
