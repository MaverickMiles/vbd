import {createContext} from "react";

interface IScrollLockContext {
    lock: () => void;
    unlock: () => void;
}

export const ScrollLockContext = createContext<IScrollLockContext>({} as IScrollLockContext);