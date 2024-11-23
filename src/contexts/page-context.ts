import {createContext} from "react";
import {PageController} from "../components/page-orchestrator/PageController";

export const pageContext = createContext<PageController>({} as PageController);