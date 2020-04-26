import { h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import classnames from 'classnames';

import {
    LevelState,
    selectSolutionItem,
    selectAnswerItem,
    setSolutionItemsCount,
    activateNextUnfilledSolution, solutionCorrect, solutionWrong, gotoNextSolution
} from './level-state';
import style from './level.scss';
import { Solution } from "../solution/solution";
import { Answers } from "../answers/answers";
import { identity } from "../../utils/functional";
import {arrayShallowEqual} from "../../utils/array";


export const Level = ({ question, answerRows, solutionItemsCount }) => {
    const [state, dispatch] = useContext(LevelState);

    useEffect(() => {
        dispatch(setSolutionItemsCount(solutionItemsCount));
    }, [solutionItemsCount]);

    const handleAnswerSelection = (value) => {
        // selects the answer
        dispatch(selectAnswerItem(value));
        // jumps to the next solution
        dispatch(activateNextUnfilledSolution());

        // Checks the solution
        if (state.solutionItems.filter(identity).length === state.solutionItemsCount) {
            if (arrayShallowEqual(state.solutionItems, state.solutions[state.currentSolution])) {
                dispatch(solutionCorrect(true));
            }
            else {
                dispatch(solutionWrong(true));
            }
            setTimeout(() => dispatch(gotoNextSolution()), 1000);
        }
    };

console.log(state);
    return (
        <section class={style.levelContainer}>
            <div class={style.questionContainer}>
                {question}
            </div>

            <div class={style.solutionContainer}>
                <Solution
                    values={state.solutionItems}
                    activeItem={state.activeSolutionItem}
                    onSelection={(i) => dispatch(selectSolutionItem(i))}
                    correct={state.solutionCorrect}
                    wrong={state.solutionWrong}
                />
                {state.solutionCorrect &&
                    <div className={classnames(style.feedback, style.correct)}>Correct! 😀</div>
                }
                {state.solutionWrong &&
                    <div className={classnames(style.feedback, style.wrong)}>Incorrect... 😕</div>
                }
            </div>

            <div class={style.answerContainer}>
                {answerRows.map((answerRow, i) =>
                    <Answers
                        key={i}
                        answers={answerRow}
                        onSelection={handleAnswerSelection}
                        selectedAnswers={state.selectedAnswers}
                        disabledAnswers={state.disabledAnswers}
                    />
                )}
                <div class={style.answerCounter}>
                    <span>{state.currentSolution + 1} / {state.solutions.length}.</span>
                    <span class={style.correct}>{state.passed} passed.</span>
                    <span class={style.wrong}>{state.failed} failed.</span>
                </div>
            </div>
        </section>
    );
};
