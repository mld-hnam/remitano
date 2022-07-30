import { message } from "antd";
import debounce from "lodash.debounce";

export const displayErrorMessage = debounce(
  function (error) {
    message.error({
      content: error,
      duration: 2,
    });
  },
  2000,
  { leading: true, trailing: false }
);
