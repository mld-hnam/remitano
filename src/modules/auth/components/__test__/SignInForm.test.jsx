import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { useAuthLogin } from '@/modules/auth/services';
import SignInForm from '../SignInForm';

jest.mock('@/modules/auth/services/useAuthLogin');

it('should be rendered', async () => {
  const login = jest.fn();
  useAuthLogin.mockReturnValue({
    isLoading: false,
    mutateAsync: login,
  });

  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <SignInForm />
    </Router>
  );

  expect(screen.getByText('account_forgot_password')).toBeInTheDocument();
  expect(screen.getByText('action.login')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('common_email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('common_password')).toBeInTheDocument();

  userEvent.type(screen.queryByRole('textbox'), 'nam@finbase.vn');

  // act(() => userEvent.type(screen.queryByTestId('password'), 'password'));
  // expect(login).toBeCalled();
});
