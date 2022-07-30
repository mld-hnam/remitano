import { useMutation } from "react-query";

import request from "@/utils/request";
import { setTokens, setUser } from "@/utils/account";
/**
 * Login with credentials
 * @param {Credentials} options
 */
const useAuthLogin = (options) =>
  useMutation(async (data) => request.post("/auth/login", data), {
    ...options,
    onSuccess: (r) => {
      const { tokens, user } = r;
      setTokens(tokens);
      setUser(JSON.stringify(user));
      options && options.onSuccess(r);
    },
  });

export default useAuthLogin;
