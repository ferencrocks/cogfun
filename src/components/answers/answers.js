import { h } from 'preact';
import style from './answers.scss';

import { AnswerItem } from "./answer-item/answer-item";


export const Answers = ({ answers, selectedAnswers, disabledAnswers, onSelection }) => {
    return (
        <section class={style.answerContainer}>
            {answers.map((value, i) => {
                return <AnswerItem
                    key={i}
                    value={value}
                    onClick={() => onSelection(value)}
                    selected={selectedAnswers.includes(value)}
                    disabled={disabledAnswers.includes(value)}
                />
            })}
        </section>
    );
};
