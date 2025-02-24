/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Length, validate, ValidationError } from 'class-validator';
import { ValidationResult } from '../../../shared/validation';

export class RequestDto {
  async validate(): Promise<ValidationResult> {
    try {
      console.log('This:', this);
      const validationErrors = await validate(this, { forbidUnknownValues: false });

      if (validationErrors && validationErrors.length > 0) {
        return {
          ok: false,
          errors: validationErrors,
        };
      }

      return { ok: true, errors: [] };
    } catch (_: any) {
      return { ok: false, errors: [] };
    }
  }
}


export class ExchangeGoogleTokenBody extends RequestDto {
  @Length(1)
  code: string;

  constructor(body: any) {
    super();
    if (body && body.code) {
      this.code = String(body.code);
    }
  }
}

export class LogoutRequestBody extends RequestDto {
  constructor(body: any) {
    super();
    console.log('45: ', body);
    if (body && body.refresh_token) {
      this.refreshToken = String(body.refresh_token);
    }
  }

  @Length(1)
  refreshToken: string;
}

export class RefreshTokenRequestBody extends RequestDto {
  constructor(body: any) {
    super();
    if (body && body.refresh_token) {
      this.refreshToken = body.refresh_token;
    }
  }

  @Length(1)
  refreshToken: string;
}