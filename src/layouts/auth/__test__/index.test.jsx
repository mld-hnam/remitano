import { render } from '@testing-library/react';
import { useConfig } from '@/libs/config';
import AuthLayout from '..';

jest.mock('@/libs/config');

it('should render', () => {
  useConfig.mockReturnValue({ emailSupport: 'test@gamail.com' });
  const { queryByText } = render(
    <AuthLayout>
      <div>test</div>
    </AuthLayout>
  );
  expect(queryByText('test')).toBeInTheDocument();
  expect(0).toEqual(0);
});
