import { renderHook } from '@testing-library/react-hooks';
import { QueryClientProviderWrapper } from '@/setupTests';
import request from '@/utils/request';
import useAuthLogout from '../useAuthLogout';

jest.mock('@/utils/request');

test('user login', async () => {
  request.post.mockResolvedValue({});

  const { result, waitFor } = renderHook(() => useAuthLogout({}), {
    wrapper: QueryClientProviderWrapper,
  });

  await waitFor(() => result.current.isSuccess);
  expect(result.current.data).toEqual({});
});
