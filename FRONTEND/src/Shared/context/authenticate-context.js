import { createContext } from 'react';

export const AuthContext = createContext({ // will be used to share state across components.
    role: "",
    logIn: () => {},
    logOut: () => {},
    token: null,
    userId: "",
    isDeleted: false,
    SetIsDeleted: () => {},
})