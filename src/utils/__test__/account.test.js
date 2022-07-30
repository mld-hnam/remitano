import {
  setToken,
  getToken,
  removeToken,
  setRoles,
  getRoles,
  removeRoles,
  hasRoles,
} from '../account';

const TOKEN_VALUE = 'token';
const TOKEN_KEY = 'token';

describe('test token', () => {
  test('setToken', () => {
    setToken(TOKEN_VALUE);
    expect(localStorage.getItem(TOKEN_KEY)).toBe(JSON.stringify(TOKEN_VALUE));
  });

  test('getToken', () => {
    setToken(TOKEN_VALUE);
    const value = getToken(TOKEN_KEY);
    expect(value).toBe(TOKEN_VALUE);
  });

  test('removeToken', () => {
    removeToken(TOKEN_KEY);
    const value = getToken(TOKEN_KEY);
    expect(value).toEqual(undefined);
  });
});

const USER_ROLES_KEY = 'roles';
const USER_ROLES_VALUE = 'roles';
describe('test roles', () => {
  test('setRoles', () => {
    setRoles(USER_ROLES_VALUE);
    expect(localStorage.getItem(USER_ROLES_KEY)).toBe(
      JSON.stringify(USER_ROLES_VALUE)
    );
  });

  test('getRoles', () => {
    setRoles(USER_ROLES_VALUE);
    const value = getRoles(USER_ROLES_KEY);
    expect(value).toBe(USER_ROLES_VALUE);
  });

  test('removeRoles', () => {
    removeRoles(USER_ROLES_KEY);
    const value = getToken(USER_ROLES_KEY);
    expect(value).toEqual(undefined);
  });
});

describe('hasRoles', () => {
  beforeEach(() => {
    const roleList = ['a', 'b', 'c'];
    setRoles(roleList);
  });

  it('null', () => {
    const result = hasRoles(null);
    expect(result).toEqual(false);
  });

  it('a true', () => {
    const result = hasRoles('a');
    expect(result).toEqual(true);
  });

  it('[a] true', () => {
    const result = hasRoles(['a']);
    expect(result).toEqual(true);
  });

  it('false', () => {
    const result = hasRoles(['x']);
    expect(result).toEqual(false);
  });

  it('roles was null', () => {
    setRoles(null);
    const result = hasRoles(['a']);
    expect(result).toEqual(false);
  });
});
