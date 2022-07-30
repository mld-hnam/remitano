import { useQuery } from "react-query";
import request from "@/utils/request";

export default function useAuthRegister() {
  return useQuery(["auth", "register"], (params) =>
    request.post(`auth/register`, { ...params })
  );
}
