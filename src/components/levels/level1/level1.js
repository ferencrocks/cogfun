import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import shuffle from 'shuffle-x';

import { Level } from '../level';
import { cognitiveFunctions, getPersonalityCognitiveFunctions, isExtraverted, isIntroverted } from "../../../mbti/cognitive-functions";
import { level1Reducer } from './level1-state';
import { personalities } from "../../../mbti/personalities";
import {Question} from "../../question/question";
import {arrayShallowEqual} from "../../../utils/array";
import {LevelState, setSolutions, solutionCorrect, solutionWrong} from "../level-state";
import {setLevelReducer} from "../level-state-provider";

export const Level1 = () => {
    const [state, dispatch] = useContext(LevelState);
    console.log(state, dispatch);

    // runs when the component is mounted
    useEffect(() => {
        setLevelReducer(level1Reducer);

        const shuffledPersonalities = shuffle(personalities);
        dispatch(setSolutions(
            shuffledPersonalities.map(personality => getPersonalityCognitiveFunctions(personality.functions)),
            shuffledPersonalities
        ));
    }, []);

    if (state.solutions.length === 0 || state.solutionsMeta.length === 0) {
        return null;
    }

    return (
        <Level
            question={
                <Question
                    question="Which are the cognitive functions (in order of relevance) of the following personality type?"
                    questionSubject={state.solutionsMeta[state.currentSolution].functions.join('')}
                    questionSubjectAlias={state.solutionsMeta[state.currentSolution].alias}
                />
            }
            solutionItemsCount={4}
            answerRows={[
                cognitiveFunctions.filter(isExtraverted),
                cognitiveFunctions.filter(isIntroverted)
            ]}
        />
    );
};
