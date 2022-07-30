import { act, renderHook } from '@testing-library/react-hooks';
import { QueryClientProviderWrapper } from '@/setupTests';
import request from '@/utils/request';
import useAuthLogin from '../useAuthLogin';

jest.mock('@/utils/request');
beforeEach(() => {
  request.post.mockResolvedValue({ token: 'token' });
});
test('useLogin', async () => {
  const onSuccess = jest.fn();
  const { result } = renderHook(
    () =>
      useAuthLogin({
        onSuccess,
      }),
    {
      wrapper: QueryClientProviderWrapper,
    }
  );

  const { mutateAsync } = result.current;
  await act(() =>
    mutateAsync({
      phone: 'PHONE',
      password: 'PASSWORD',
    })
  );

  expect(request.post).toBeCalledWith('/auth/login', {
    phone: 'PHONE',
    password: 'PASSWORD',
  });
  expect(onSuccess).toBeCalled();
});
