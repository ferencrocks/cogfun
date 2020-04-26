import { h } from 'preact';
import { useReducer } from "preact/hooks";
import { baseReducer, initialReducerState, LevelState } from "./level-state";
import { identity } from "../../utils/functional";

let levelReducer = identity;
export const setLevelReducer = (reducer) => {
    levelReducer = reducer;
};


export const LevelStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        (state, action) => levelReducer(baseReducer(state, action), action),
        initialReducerState
    );

    return (
        <LevelState.Provider value={[state, dispatch]}>{children}</LevelState.Provider>
    );
};
