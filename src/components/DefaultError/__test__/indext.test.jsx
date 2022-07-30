import { screen } from '@testing-library/react';
import { render } from '@/libs/test';
import userEvent from '@testing-library/user-event';

import DefaultError from '../';

test('renders DefaultError', () => {
  const { history } = render(<DefaultError title="title" content="content" />, {
    route: '/',
  });

  expect(screen.queryByText('title')).toBeInTheDocument();
  expect(screen.queryByText('content')).toBeInTheDocument();

  userEvent.click(screen.getByRole('logo'));
  expect(history.location.pathname).toEqual('/');
});
