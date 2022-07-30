import {
  isResponseError,
  isRequestError,
  isUnauthorized,
  isServerError,
  isUserError,
  createHandlerChain,
  serverErrorHandler,
  userErrorHandler,
  unauthorizedErrorHandler,
  requestErrorHandler,
  otherErrorHandler,
} from '../request';
import { clearAuthorization } from '../account';
import history from '../history';
import { displayErrorMessage } from '@/utils/message';

const config = { enableShowBackendError: true };

jest.mock('@/utils/message');
jest.mock('../account', () => ({
  clearAuthorization: jest.fn(),
  getToken: jest.fn(),
}));
jest.mock('../history', () => ({
  push: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('isResponseError test', () => {
  expect(isResponseError({ response: {} })).toBeTruthy();
  expect(isResponseError({})).toBeFalsy();
});

test('isRequestError test', () => {
  expect(isRequestError({ request: {} })).toBeTruthy();
  expect(isRequestError({})).toBeFalsy();
});

test('isUnauthorized test', () => {
  expect(isUnauthorized({ response: { status: 403 } })).toBeTruthy();
  expect(isUnauthorized({ response: { status: 200 } })).toBeFalsy();
});

test('isServerError test', () => {
  expect(isServerError({ response: { status: 400 } })).toBeFalsy();
  expect(isServerError({ response: { status: 500 } })).toBeTruthy();
  expect(isServerError({ response: { status: 503 } })).toBeTruthy();
});

test('isUserError test', () => {
  expect(isUserError({ response: { status: 400 } })).toBeTruthy();
  expect(isUserError({ response: { status: 409 } })).toBeTruthy();
  expect(isUserError({ response: { status: 500 } })).toBeFalsy();
  expect(isUserError({ response: { status: 399 } })).toBeFalsy();
});

describe('createHandlerChain test', () => {
  test('should invoke handler correctly', () => {
    const handler = jest.fn((_, next) => next());
    const handlerChain = createHandlerChain([handler]);
    expect(handlerChain({ config: {} })).rejects.toEqual({ config: {} });
  });

  test('should create empty handler chain with not error', () => {
    createHandlerChain();
  });

  test('should not invoke handler when the config does not use the default handler', () => {
    const handler = jest.fn((_, next) => next());
    const handlerChain = createHandlerChain([handler]);
    expect(
      handlerChain({ config: { useDefaultErrorHandler: false } })
    ).rejects.toEqual({ config: { useDefaultErrorHandler: false } });
    expect(handler).not.toBeCalled();
  });
});

describe('serverErrorHandler test', () => {
  test('should not handle when it is not response error', () => {
    const next = jest.fn();

    serverErrorHandler({}, next);

    expect(next).toBeCalled();
    expect(displayErrorMessage).not.toBeCalled();
  });

  test('should not handle when it is not server error', () => {
    const error = {
      response: { status: 400 },
      config,
    };
    const next = jest.fn();

    serverErrorHandler(error, next);

    expect(next).toBeCalled();
    expect(displayErrorMessage).not.toBeCalled();
  });

  test('should handle when it is server error', () => {
    const error = {
      response: { status: 500 },
      config,
    };
    const next = jest.fn();

    serverErrorHandler(error, next);

    expect(displayErrorMessage).toBeCalled();
  });
});

describe('userErrorHandler test', () => {
  test('should not handle when it is not response error', () => {
    const next = jest.fn();
    userErrorHandler({}, next);

    expect(next).toBeCalled();
    expect(displayErrorMessage).not.toBeCalled();
  });

  test('should not handle when it is not user error', () => {
    const next = jest.fn();

    userErrorHandler({ response: { status: 500 } }, next);

    expect(next).toBeCalled();
    expect(displayErrorMessage).not.toBeCalled();
  });

  test('should handle when it is user error', () => {
    const next = jest.fn();

    userErrorHandler({ response: { status: 400 }, config }, next);

    expect(displayErrorMessage).toBeCalled();
  });
});

describe('unauthorizedErrorHandler test', () => {
  test('should not handle when it is not response error', () => {
    const next = jest.fn();

    unauthorizedErrorHandler({}, next);

    expect(next).toBeCalled();
    expect(clearAuthorization).not.toBeCalled();
    expect(history.push).not.toBeCalled();
  });

  test('should not handle when it is not user error', () => {
    const next = jest.fn();

    unauthorizedErrorHandler({ response: { status: 500 } }, next);

    expect(next).toBeCalled();
    expect(clearAuthorization).not.toBeCalled();
    expect(history.push).not.toBeCalled();
  });

  test('should not handle when it is not unauthorized error', () => {
    const next = jest.fn();

    unauthorizedErrorHandler({ response: { status: 400 } }, next);

    expect(next).toBeCalled();
    expect(clearAuthorization).not.toBeCalled();
    expect(history.push).not.toBeCalled();
  });

  test('should handle when it is unauthorized error', () => {
    const next = jest.fn();

    unauthorizedErrorHandler({ response: { status: 403 } }, next);

    expect(next).not.toBeCalled();
    expect(clearAuthorization).toBeCalled();
    expect(history.push).toBeCalled();
  });
});

describe('requestErrorHandler test', () => {
  test('should not handle when it is response error', () => {
    const next = jest.fn();

    requestErrorHandler({ response: {} }, next);

    expect(next).toBeCalled();
    expect(displayErrorMessage).not.toBeCalled();
  });

  test('should handle when it is request error', () => {
    const next = jest.fn();

    requestErrorHandler({ request: {} }, next);

    expect(displayErrorMessage).toBeCalled();
  });
});

describe('otherErrorHandler test', () => {
  test('should not handle when it is response error', () => {
    const next = jest.fn();

    otherErrorHandler({ response: {} }, next);

    expect(next).toBeCalled();
    expect(displayErrorMessage).not.toBeCalled();
  });

  test('should not handle when it is request error', () => {
    const next = jest.fn();

    otherErrorHandler({ request: {} }, next);

    expect(next).toBeCalled();
    expect(displayErrorMessage).not.toBeCalled();
  });

  test('should handle when it is other error', () => {
    const next = jest.fn();

    otherErrorHandler({}, next);

    expect(displayErrorMessage).toBeCalled();
  });
});
