import React from "react";
import firebase from "firebase/compat";
import {User} from "@firebase/auth";

export interface IClaims {
    admin: boolean;
}

interface IUserContext {
    user: User | null;
    claims: IClaims | null;
    setUser: (user: User) => void;
    setClaims: (claims: IClaims) => void;
}

const defaultState = {
    user: null,
    claims: {
        admin: false
    },
    setClaims: () => {},
    setUser: () => {}
};

export const UserContext = React.createContext<IUserContext>(defaultState);
