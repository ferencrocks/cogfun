export const E = 'E';
export const I = 'I';
export const N = 'N';
export const S = 'S';
export const T = 'T';
export const F = 'F';
export const P = 'P';
export const J = 'J';
export const functions = [E, I, N, S, T, F, P, J];
export const functionPairs = [
    [E, I],
    [N, S],
    [T, F],
    [P, J]
];

export const ISTJ = {
    functions: [I, S, T, J],
    alias: "inspector"
};
export const ISTP = {
    functions: [I, S, T, P],
    alias: "crafter"
};
export const ISFJ = {
    functions: [I, S, F, J],
    alias: "protector"
};
export const ISFP = {
    functions: [I, S, F, P],
    alias: "artist"
};
export const INFJ = {
    functions: [I, N, F, J],
    alias: "advocate"
};
export const INFP = {
    functions: [I, N, F, P],
    alias: "mediator"
};
export const INTJ = {
    functions: [I, N, T, J],
    alias: "architect"
};
export const INTP = {
    functions: [I, N, T, P],
    alias: "thinker"
};
export const ESTP = {
    functions: [E, S, T, P],
    alias: "persuader"
};
export const ESTJ = {
    functions: [E, S, T, J],
    alias: "director"
};
export const ESFP = {
    functions: [E, S, F, P],
    alias: "performer"
};
export const ESFJ = {
    functions: [E, S, F, J],
    alias: "caregiver"
};
export const ENFP = {
    functions: [E, N, F, P],
    alias: "champion"
};
export const ENFJ = {
    functions: [E, N, F, J],
    alias: "giver"
};
export const ENTP = {
    functions: [E, N, T, P],
    alias: "debater"
};
export const ENTJ = {
    functions: [E, N, T, J],
    alias: "commander"
};

export const personalities = [
    ISTJ, ISTP,
    ISFJ, ISFP,
    INFJ, INFP,
    INTJ, INTP,
    ESTP, ESTJ,
    ESFP, ESFJ,
    ENFP, ENFJ,
    ENTP, ENTJ
];

export const isExtraverted = (personality) => personality[0] === E;
export const isIntroverted = (personality) => personality[0] === I;
export const isJudger = (personality) => personality[3] === J;
export const isPerceiver = (personality) => personality[3] === P;

export const getEnergyFlowPreference = (personality) => personality[0];
export const getJudgingPreference = (personality) => personality[2];
export const getPerceivingPreference = (personality) => personality[1];
export const getPrimaryExtravertedPreference = (personality) => personality[3];

export const getOppositePreference = (fn) => {
    const [revserseFn] = functionPairs
        .find(pair => pair.indexOf(fn) > -1)
        .filter(pairFn => pairFn !== fn);
    return revserseFn;
};
