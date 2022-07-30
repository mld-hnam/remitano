import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from '../storage';

test('getLocalStorage', () => {
  setLocalStorage('token', 'token');
  const token = getLocalStorage('token');
  expect(JSON.parse(localStorage.getItem('token'))).toEqual(token);
});

test('getLocalStorage null', () => {
  getLocalStorage(null);
  expect(JSON.parse(localStorage.getItem(null))).toEqual(null);
});

test('getLocalStorage', () => {
  setLocalStorage('token', 'token');
  const token = getLocalStorage('token');
  expect(JSON.parse(localStorage.getItem('token'))).toEqual(token);
});

test('removeLocalStorage', () => {
  removeLocalStorage('token');
  expect(localStorage.getItem('token')).toEqual(null);
});
