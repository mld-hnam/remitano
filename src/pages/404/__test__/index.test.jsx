import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/libs/test';

import NoFoundPage from '..';

it('should render without NoFoundPage', () => {
  const { history } = render(<NoFoundPage />, { route: '/' });
  expect(screen.queryByText('page.404.title')).toBeInTheDocument();
  expect(screen.queryByText('page.404.content')).toBeInTheDocument();
  expect(screen.queryByText('action.backHome')).toBeInTheDocument();

  userEvent.click(screen.getByRole('button'));
  expect(history.location.pathname).toEqual('/');
});
