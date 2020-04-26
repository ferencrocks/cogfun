import { h } from 'preact';
import style from './question.scss';

export const Question = ({ question, questionSubject, questionSubjectAlias }) => {
    return (
        <div class={style.questionContainer}>
            <span class={style.question}>{question}</span>
            <div class={style.questionSubjectContainer}>
                <span className={style.questionSubject}>{questionSubject}</span>
                <span class={style.questionSubjectAlias}>{questionSubjectAlias}</span>
            </div>
        </div>
    );
};
