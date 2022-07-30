import { render } from '@testing-library/react';

import ConfigContext from '../ConfigContext';
import ConfigProvider from '../ConfigProvider';

it('should be rendered', () => {
  let actualConfig;
  let config = { dateFormat: 'DD/MM/YYYY' };
  const getConfig = jest.fn().mockReturnValue(config);

  render(
    <ConfigProvider getConfig={getConfig}>
      <ConfigContext.Consumer>
        {(config) => {
          actualConfig = config;
          return null;
        }}
      </ConfigContext.Consumer>
    </ConfigProvider>
  );

  expect(actualConfig).toBe(config);
  expect(getConfig).toBeCalled();
});
