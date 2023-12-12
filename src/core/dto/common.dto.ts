import { Request } from 'express';
export interface DynamicObject {
  [key: string]: any;
}
export interface SustainLabRequest extends Request {
  uid?: string;
  token?: string;
  claims?: any;
}
