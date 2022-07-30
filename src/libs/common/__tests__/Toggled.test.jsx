import { render, screen } from '@testing-library/react';

import Toggled from '../Toggled';

it('should render nothing if not toggled', () => {
  render(<Toggled>Children</Toggled>);

  expect(screen.queryByText('Children')).not.toBeInTheDocument();
});

it('should render children if toggled', () => {
  render(<Toggled toggled>Children</Toggled>);

  expect(screen.queryByText('Children')).toBeInTheDocument();
});
