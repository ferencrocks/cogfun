import { h } from 'preact';

import { SolutionItem } from "./solution/solution-item";
import style from './solution.scss';


export const Solution = ({ values, activeItem, correct, wrong, onSelection }) => {
    return (
        <div class={style.solutionsContainer}>
            {values.map((value, i) =>
                <SolutionItem
                    value={value}
                    key={i}
                    active={i === activeItem}
                    onClick={() => onSelection(i)}
                    correct={correct}
                    wrong={wrong}
                    filled={!!value}
                />
            )}
        </div>
    );
};
