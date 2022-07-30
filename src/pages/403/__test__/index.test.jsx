import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/libs/test';
import ForbiddenPage from '..';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('@/contexts/AuthContext');

it('should render without ForbiddenPage', () => {
  const logout = jest.fn();
  useAuth.mockReturnValue({ logout });
  const { history } = render(<ForbiddenPage />, { route: '/' });

  expect(screen.queryByText('page.403.title')).toBeInTheDocument();
  expect(screen.queryByText('page.403.content')).toBeInTheDocument();
  expect(screen.queryByText('action.backHome')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'action.backHome' }));
  expect(history.location.pathname).toEqual('/');

  userEvent.click(
    screen.getByRole('button', { name: 'page.loginWithAnotherAccount' })
  );
  expect(logout).toHaveBeenCalled();
  expect(history.location.pathname).toEqual('/');

  userEvent.click(screen.getByRole('button', { name: 'action.tryAgain' }));
  expect(history.location.pathname).toEqual('/');
});
