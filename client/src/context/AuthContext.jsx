import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { api } from '../lib/api.js';

const TOKEN_KEY = 'curso.auth.token';

// El estado 'hydrating' evita que ProtectedRoute redirija antes de leer localStorage y hacer fetch de /me.
const initialState = { status: 'hydrating', user: null };

function reducer(state, action) {
  switch (action.type) {
    case 'hydrated':
      return { status: action.user ? 'authenticated' : 'guest', user: action.user };
    case 'authenticated':
      return { status: 'authenticated', user: action.user };
    case 'guest':
      return { status: 'guest', user: null };
    default:
      return state;
  }
}

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    // Remove old lingering storage key if any
    window.localStorage.removeItem('curso.auth.user');
    
    if (!token) {
      dispatch({ type: 'hydrated', user: null });
      return;
    }
    
    // Verify token with backend
    api.auth.me()
      .then((data) => {
        dispatch({ type: 'hydrated', user: data.user });
      })
      .catch(() => {
        window.localStorage.removeItem(TOKEN_KEY);
        dispatch({ type: 'hydrated', user: null });
      });
  }, []);

  const login = useCallback(async ({ email, password }) => {
    if (!email || !password) throw new Error('Correo y contraseña son obligatorios.');
    const data = await api.auth.login({ email, password });
    window.localStorage.setItem(TOKEN_KEY, data.token);
    dispatch({ type: 'authenticated', user: data.user });
    return data.user;
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    if (!name?.trim() || !email?.trim() || !password) {
      throw new Error('Todos los campos son obligatorios.');
    }
    if (password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }
    const data = await api.auth.register({ email, password });
    window.localStorage.setItem(TOKEN_KEY, data.token);
    dispatch({ type: 'authenticated', user: data.user });
    return data.user;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);
    dispatch({ type: 'guest' });
  }, []);

  const value = useMemo(
    () => ({ ...state, login, signup, logout }),
    [state, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
