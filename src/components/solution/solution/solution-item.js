import { h } from 'preact';
import classNames from 'classnames';
import style from './solution-item.scss';


export const SolutionItem = ({ value, active, correct, wrong, filled, disabled, onClick }) => {
    const handleClick = () => {
        if (typeof onClick === 'function' && !disabled) onClick();
    };

    return (
        <div
            class={classNames(
                style.solutionItem,
                {
                    [style.active]: active,
                    [style.filled]: filled,
                    [style.correct]: correct,
                    [style.wrong]: wrong
                }
            )}
            onClick={handleClick}
        >
            <div class={style.solutionUnderline}>
                {value || '?'}
            </div>
        </div>
    );
};
