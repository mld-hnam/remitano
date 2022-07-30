import { render } from '@testing-library/react';

import RegisterPage from '../index';

it('should be render ', () => {
  const { container } = render(<RegisterPage />);
  expect(container.tagName).toBe('DIV');
});
