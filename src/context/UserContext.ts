import React from "react";
import firebase from "firebase/compat";
import {User} from "@firebase/auth";

interface IUserContext {
    user: User | null;
    setUser: (user: User) => void;
}

const defaultState = {
    user: null,
    setUser: () => {}
};

export const UserContext = React.createContext<IUserContext>(defaultState);
