import React from "react";
import { FormattedMessage, IntlProvider } from "react-intl";

const Error = ({ code, defaultMessage }) => {
  return (
    <IntlProvider locale="vi">
      <FormattedMessage id={`error.${code}`} defaultMessage={defaultMessage} />
    </IntlProvider>
  );
};

const createError = (code, defaultMessage = null) => (
  <Error code={code} defaultMessage={defaultMessage} />
);

export { createError };
export default Error;
