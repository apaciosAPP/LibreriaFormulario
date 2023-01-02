import React, { useState, useEffect, createContext, useMemo } from "react";
import jwtDecode from "jwt-decode";
import { setToken, getToken, removeToken, hasExpiredToken } from "../api/token";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
  setReloadUser: () => null
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);
  const [realoadUser, setReloadUser] = useState(false);

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const valido = hasExpiredToken(token);

        if (valido) {
          setAuth({
            token,
            idUser: jwtDecode(token).usuario?.uid,
            nombre: jwtDecode(token).usuario?.nombre,
            rol: jwtDecode(token).usuario?.rol,
            img: jwtDecode(token).usuario?.img
          });
        } else {
          removeToken();
          setAuth(null);
        }
      } else {
        setAuth(null);
      }
    })();
  }, [realoadUser]);

  const login = async (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).usuario?.uid,
      nombre: jwtDecode(token).usuario?.nombre,
      rol: jwtDecode(token).usuario?.rol,
      img: jwtDecode(token).usuario?.img
    });
  };

  const logout = (history, location) => {
    const { pathname, search } = location;
    const lastPath = pathname + search;
    localStorage.setItem("lastPath", lastPath);
    if (auth) {
      removeToken();
      setAuth(null);
      history.replace("/");
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,

      setReloadUser
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}
