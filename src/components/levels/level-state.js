import { createContext } from "preact";

/////// Actions

export const SELECT_SOLUTION_ITEM_ACTION = 'SET_ACTIVE_SOLUTION_ITEM';
export const selectSolutionItem = (activeSolutionItem) =>
    ({ type: SELECT_SOLUTION_ITEM_ACTION, activeSolutionItem });

export const SET_SOLUTIONS_ACTION = 'SET_SOLUTIONS';
export const setSolutions = (solutions, solutionsMeta) =>
    ({ type: SET_SOLUTIONS_ACTION, solutions, solutionsMeta });

export const RETRY_CURRENT_SOLUTION_ACTION = 'RETRY_CURRENT_SOLUTION';
export const retryCurrentSolution = () =>
    ({ type: RETRY_CURRENT_SOLUTION_ACTION });

export const GOTO_NEXT_SOLUTION_ACTION = 'GOTO_NEXT_SOLUTION';
export const gotoNextSolution = () =>
    ({ type: GOTO_NEXT_SOLUTION_ACTION });

export const SET_SOLUTION_ITEMS_COUNT_ACTION = 'SET_SOLUTION_ITEMS_COUNT';
export const setSolutionItemsCount = (solutionItemsCount) =>
    ({ type: SET_SOLUTION_ITEMS_COUNT_ACTION, solutionItemsCount });

export const ACTIVATE_NEXT_UNFILLED_SOLUTION_ACTION = 'ACTIVATE_NEXT_UNFILLED_SOLUTION';
export const activateNextUnfilledSolution = () =>
    ({ type: ACTIVATE_NEXT_UNFILLED_SOLUTION_ACTION });

export const SELECT_ANSWER_ITEM_ACTION = 'SELECT_ANSWER_ITEM';
export const selectAnswerItem = (answerItemValue) =>
    ({ type: SELECT_ANSWER_ITEM_ACTION, answerItemValue });

export const DISABLE_ANSWER_ITEM_ACTION = 'DISABLE_ANSWER_ITEM';
export const disableAnswerItem = (answerItemValue) =>
    ({ type: DISABLE_ANSWER_ITEM_ACTION, answerItemValue });

export const SOLUTION_CORRECT_ACTION = 'SOLUTION_CORRECT';
export const solutionCorrect = (correct) =>
    ({ type: SOLUTION_CORRECT_ACTION, solutionCorrect: correct });

export const SOLUTION_WRONG_ACTION = 'SOLUTION_WRONG';
export const solutionWrong = (wrong) =>
    ({ type: SOLUTION_WRONG_ACTION, solutionWrong: wrong });

/////// Reducer

const cleanQuestion = {
    activeSolutionItem: 0,
    selectedAnswers: [],
    disabledAnswers: [],
    solutionCorrect: false,
    solutionWrong: false
};

export const baseReducer = (state, action) => {
    switch (action.type) {
        case SELECT_SOLUTION_ITEM_ACTION:
            return {...state, activeSolutionItem: action.activeSolutionItem};

        case SET_SOLUTIONS_ACTION:
            return {...state, solutions: action.solutions, solutionsMeta: action.solutionsMeta};

        case GOTO_NEXT_SOLUTION_ACTION:
            return {
                ...state,
                currentSolution: state.currentSolution + 1,
                ...cleanQuestion,
                solutionItems: new Array(state.solutionItemsCount).fill(null)
            };

        case SET_SOLUTION_ITEMS_COUNT_ACTION:
            return {
                ...state,
                solutionItems: new Array(action.solutionItemsCount).fill(null),
                solutionItemsCount: action.solutionItemsCount
            };
        case ACTIVATE_NEXT_UNFILLED_SOLUTION_ACTION:
            // if the active solution is still unfilled, do nothing
            if (!state.selectedAnswers[state.activeSolutionItem])
            {
                return state;
            }
            // look ahead
            for (let i = state.activeSolutionItem; i < state.solutionItemsCount; i++)
            {
                if (!state.solutionItems[i]) {
                    return {...state, activeSolutionItem: i};
                }
            }
            // look behind
            for (let i = 0; i < state.activeSolutionItem; i++)
            {
                if (!state.solutionItems[i]) {
                    return {...state, activeSolutionItem: i};
                }
            }
            // finished
            return {...state, activeSolutionItem: -1};


        case SELECT_ANSWER_ITEM_ACTION:
            // if the answer is already selected
            const selectedAnswerIdx = state.selectedAnswers.indexOf(action.answerItemValue);
            if (selectedAnswerIdx > -1)
            {
                return {
                    ...state,
                    // deselect the answer
                    selectedAnswers: state.selectedAnswers.filter(answer => answer !== action.answerItemValue),
                    // clear the solution item
                    activeSolutionItem: state.solutionItems.indexOf(action.answerItemValue),
                    solutionItems: state.solutionItems.map(answer => answer === action.answerItemValue ? null : answer)
                };
            }

            // the answer wasn't selected
            const solutionItems = state.solutionItems;
            solutionItems[state.activeSolutionItem] = action.answerItemValue;
            return {
                ...state,
                selectedAnswers: [...state.selectedAnswers, action.answerItemValue],
                solutionItems
            };
        case DISABLE_ANSWER_ITEM_ACTION:
            return {...state, disabledAnswers: [...state.disabledAnswers, action.answerItemValue]};

        case SOLUTION_CORRECT_ACTION:
            return {
                ...state,
                solutionCorrect: action.solutionCorrect,
                passed: state.passed + 1
            };

        case SOLUTION_WRONG_ACTION:
            return {
                ...state,
                solutionWrong: action.solutionWrong,
                failed: state.failed + 1
            };

        default:
            return state;
    }
};


/////// Initial state

export const initialReducerState = {
    solutions: [],
    solutionsMeta: [],
    currentSolution: 0,

    solutionItems: [],
    activeSolutionItem: 0,
    solutionItemsCount: 0,
    selectedAnswers: [],
    disabledAnswers: [],

    solutionCorrect: false,
    solutionWrong: false,
    passed: 0,
    failed: 0
};


/////// Context

export const LevelState = createContext({});
