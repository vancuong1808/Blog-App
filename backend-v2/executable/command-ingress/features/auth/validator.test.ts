import { describe, expect } from '@jest/globals'
import { ExchangeGoogleTokenBody } from './adapter/dto';

describe('Validator test', function() {
  it('Should return error if the GoogleOAuthBody is invalid', async () => {
    const body = {
      code: '',
    };

    const dto = new ExchangeGoogleTokenBody(body);
    const res = await dto.validate();

    expect(res).not.toBeNull();
    expect(res.ok).toBe(false);
    expect(res.errors).toHaveLength(1);
  });
});