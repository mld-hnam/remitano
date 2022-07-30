import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { getToken } from '@/utils/account';
import { useGetUserProfile } from '@/modules/user/services';
import { useUserPermissions } from '@finbase/sdk';
import { useAuthLogout } from '@/modules/auth/services';
import { useAuth, AuthProvider } from '../AuthContext';
import { PageLoading } from '@/components';
import { Button } from 'ant';
import * as mockedRemoveToke from '@/utils/account';

jest.mock('@/utils/account');
jest.mock('@/modules/user/services');
jest.mock('@finbase/sdk');
jest.mock('@/modules/auth/services');
jest.mock('@/components');

beforeEach(() => {
  const logout = jest.fn();
  getToken.mockReturnValue('token');
  useUserPermissions.mockReturnValue({ data: [] });
  useAuthLogout.mockReturnValue({ mutateAsync: logout });
});

it('should render children', () => {
  useGetUserProfile.mockReturnValue({ data: {}, isLoading: false });

  const { queryByText } = render(
    <AuthProvider>
      <div>test</div>
    </AuthProvider>
  );
  expect(queryByText('test')).toBeInTheDocument();
});

it('should render loading', () => {
  useGetUserProfile.mockReturnValue({ data: {}, isLoading: true });
  PageLoading.mockImplementation(() => <div>loading</div>);
  const { queryByText } = render(
    <AuthProvider>
      <div>test</div>
    </AuthProvider>
  );
  expect(queryByText('loading')).toBeInTheDocument();
});

const TestComponent = () => {
  const { logout } = useAuth();
  return (
    <>
      <Button onClick={() => logout()}>logout</Button>
    </>
  );
};

it('auth context', () => {
  mockedRemoveToke.removeToken = jest.fn();
  //   const removeToken = jest.fn();
  useGetUserProfile.mockReturnValue({ data: {}, isLoading: false });

  const { queryByText } = render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );
  userEvent.click(queryByText('logout'));

  expect(mockedRemoveToke.removeToken).toBeCalled();
});
