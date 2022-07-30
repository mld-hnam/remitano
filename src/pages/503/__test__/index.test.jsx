import { render, screen } from '@testing-library/react';

import Page503 from '..';

it('should render without Page503', () => {
  render(<Page503 />);
  expect(screen.queryByText('page.503.title')).toBeInTheDocument();
  expect(screen.queryByText('page.503.content')).toBeInTheDocument();
  expect(screen.queryByText('action.tryAgain')).toBeInTheDocument();
});
