import { render, screen } from '@testing-library/react';
import Loadable from '..';

const LazyComponent = Loadable(() => import('./Components'));
const LazyComponentFallback = Loadable(
  () => import('./Components'),
  'fallback'
);

test('renders lazy component: fallback null', async () => {
  render(<LazyComponent />);
  const textToMatch = await screen.findByText(/lazy component/i);
  expect(textToMatch).toBeInTheDocument();
});

test('renders lazy component: fallback ', async () => {
  render(<LazyComponentFallback />);
  const textToMatch = await screen.findByText(/fallback/i);
  expect(textToMatch).toBeInTheDocument();
});
