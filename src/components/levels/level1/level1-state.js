import {
    SELECT_ANSWER_ITEM_ACTION
} from '../level-state';

import { getFunctionWithOppositeEnergyFlow } from "../../../mbti/cognitive-functions";


export const level1Reducer = (state, action) => {
    switch (action.type) {
        case SELECT_ANSWER_ITEM_ACTION:
            return {
                ...state,
                disabledAnswers: state.selectedAnswers.map(getFunctionWithOppositeEnergyFlow)
            };

        default:
            return state;
    }
};
