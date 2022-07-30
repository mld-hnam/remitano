import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { ConfigProvider } from '../config';
import RouteContextWrapper from './RouteContextWrapper';
import { ModalContext } from '../modal/ModalManager';

export default function render(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    wrapper: OtherWrapper,
    ...renderOptions
  } = {}
) {
  const wrapper = ({ children }) => (
    <React.Suspense fallback={null}>
      <ConfigProvider getConfig={() => ({ dateFormat: 'DD/MM/YYYY' })}>
        <RouteContextWrapper>
          <Router history={history}>
            <ModalContext.Provider value={{}}>
              {OtherWrapper ? (
                <OtherWrapper>{children}</OtherWrapper>
              ) : (
                children
              )}
            </ModalContext.Provider>
          </Router>
        </RouteContextWrapper>
      </ConfigProvider>
    </React.Suspense>
  );
  return {
    ...rtlRender(ui, {
      ...renderOptions,
      wrapper,
    }),
    history,
  };
}
