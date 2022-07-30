import { renderHook } from '@testing-library/react-hooks';

import ConfigContext from '../ConfigContext';
import useConfig from '../useConfig';

it('should be rendered', () => {
  const config = { dateFormat: 'DD/MM/YYYY' };
  const { result } = renderHook(() => useConfig(), {
    wrapper: ({ children }) => (
      <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
    ),
  });

  expect(result.current).toBe(config);
});
