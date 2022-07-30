import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "./storage";

export const removeUser = () => {
  removeLocalStorage("user");
};

export const isAuthenticated = () => {
  return getUser();
};

/**
 *
 * @returns User
 */

export const setUser = (user) => setLocalStorage("user", JSON.stringify(user));
export const getUser = () =>
  getLocalStorage("user") && JSON.parse(getLocalStorage("user"));

/**
 *
 * @returns Post
 */

export const setPost = (post) => setLocalStorage("post", JSON.stringify(post));
export const getPost = () =>
  getLocalStorage("post") && JSON.parse(getLocalStorage("post"));
