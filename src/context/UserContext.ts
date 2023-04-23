import React from "react";

interface IUserContext {
    user: any | null;
    setUser?: (user: any | null) => void;
}

const defaultState = {
    user: null,
};

export const UserContext = React.createContext<IUserContext>(defaultState);