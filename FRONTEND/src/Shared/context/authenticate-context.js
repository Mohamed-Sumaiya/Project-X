import { createContext } from 'react';

export const AuthContext = createContext({ // will be used to share state across components.
    isLoggedIn: false,
    role: "",
    authRole: () => {},
    logIn: () => {},
    logOut: () => {}
})