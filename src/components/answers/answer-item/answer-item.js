import { h } from 'preact';
import style from './answer-item.scss';

import classNames from 'classnames';


export const AnswerItem = ({ value, selected, disabled, onClick }) => {
    const handleClick = () => {
        if (typeof onClick === 'function' && !disabled) onClick();
    };

    return (
        <button
            class={classNames(
                style.answerItem,
                {[style.disabled]: disabled},
                {[style.selected]: selected}
            )}
            onClick={handleClick}
        >
            {value}
        </button>
    );
};
