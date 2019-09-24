import { authenticated } from '../../src/utils/authenticated-resolver';

describe('authenticated-resolver', () => {
  it('should throw if no user in context', async () => {
    const spy = jest.fn();
    try {
      await authenticated(spy)({}, {}, { server: {} as any }, {});
    } catch (error) {
      expect(spy).not.toHaveBeenCalled();
      expect(error.message).toBe('Unauthorized');
    }

    expect.assertions(2);
  });

  it('should call spy if user is in the context', async () => {
    const spy = jest.fn();
    await authenticated(spy)(
      {},
      {},
      { userId: 'userId', user: { id: '123', deactivated: false }, server: {} as any },
      {}
    );
    expect(spy).toBeCalled();
  });

  // it('should call spy if no user and skipJSAccountsVerification is true', async () => {
  //   const spy = jest.fn();
  //   await authenticated(spy)({}, {}, { skipJSAccountsVerification: true }, {});
  //   expect(spy).toBeCalled();
  // });
});
