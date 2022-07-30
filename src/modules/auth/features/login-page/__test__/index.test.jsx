import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { useConfig } from '@/libs/config';
import { useAuthLogin } from '@/modules/auth/services';
import LoginPage from '../index';

jest.mock('@/libs/config');
jest.mock('@/modules/auth/services');

it('should be render ', () => {
  useConfig.mockReturnValue({ emailSupport: 'test@gamail.com' });
  useAuthLogin.mockReturnValue({});
  const history = createMemoryHistory();
  const { queryByText } = render(
    <Router history={history}>
      <LoginPage />
    </Router>
  );
  expect(queryByText('account_welcome_back')).toBeInTheDocument();
});
