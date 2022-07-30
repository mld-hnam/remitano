import { useMutation } from "react-query";
import request from "@/utils/request";

export default function useAuthLogout() {
  return useMutation(["auth", "logout"], (params) =>
    request.post(`auth/logout`, { ...params })
  );
}
