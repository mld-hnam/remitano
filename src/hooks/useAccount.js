import { setUser } from "@/utils/account";
import { useState } from "react";

const useAccount = (data) => {
  const [user, setUser] = useState();
  return { user, setUser };
};
export default useAccount;
