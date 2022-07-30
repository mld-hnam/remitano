import { screen } from '@testing-library/react';
import { render } from '@/libs/test';
import PageLoading from '../';

test('renders DefaultError', () => {
  render(<PageLoading />);
  expect(screen.queryByTestId('logo')).toBeInTheDocument();
});
