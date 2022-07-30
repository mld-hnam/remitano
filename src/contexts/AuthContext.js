import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getPost,
  getUser,
  setUser as setAccount,
  setPost as setAccountPost,
} from "@/utils/account";

import { useNavigate } from "react-router";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return getUser("user") || null;
  });
  const navigate = useNavigate();
  const [post, setPost] = useState(() => {
    return getPost("post") || [];
  });

  const onLogout = useCallback(() => {
    setUser(null);
    navigate("/");
  }, [navigate]);

  const contextValue = useMemo(
    () => ({
      post,
      profile: user,
      logout: onLogout,
      setUser,
      setPost,
    }),
    [user, onLogout, post]
  );

  useEffect(() => {
    setAccount(user);
  }, [user]);

  useEffect(() => {
    setAccountPost(post);
  }, [post]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
