import {createContext} from "react";
import {PageOrchestratorState} from "../state/PageOrchestratorState";

export const PageOrchestratorContext = createContext<PageOrchestratorState>(new PageOrchestratorState());
