import { renderHook } from '@testing-library/react-hooks';
import { QueryClientProviderWrapper } from '@/setupTests';
import request from '@/utils/request';
import useAuthRegister from '../useAuthRegister';

jest.mock('@/utils/request');

test('user login', async () => {
  request.post.mockResolvedValue({});

  const { result, waitFor } = renderHook(
    () => useAuthRegister({ user: 'a', password: '1' }),
    {
      wrapper: QueryClientProviderWrapper,
    }
  );

  await waitFor(() => result.current.isSuccess);
  expect(result.current.data).toEqual({});
});
