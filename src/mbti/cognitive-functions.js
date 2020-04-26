import {
    isIntroverted as isIntroverteddPersonality,
    isExtraverted as isExtravertedPersonality,
    isJudger,
    isPerceiver,
    getJudgingPreference, getPerceivingPreference, getOppositePreference, getEnergyFlowPreference
} from './personalities';

export const Ti = 'Ti';
export const Te = 'Te';
export const Fi = 'Fi';
export const Fe = 'Fe';
export const Ni = 'Ni';
export const Ne = 'Ne';
export const Si = 'Si';
export const Se = 'Se';
export const E = 'e';
export const I = 'i';

export const cognitiveFunctions = [Ti, Te, Fi, Fe, Ni, Ne, Si, Se];
export const judgingCognitiveFunctions = [Ti, Te, Fi, Fe];
export const perceivingCognitiveFunctions = [Ni, Ne, Si, Se];

export const isExtraverted = (cognitiveFunction) => cognitiveFunction[1] === 'e';
export const isIntroverted = (cognitiveFunction) => cognitiveFunction[1] === 'i';
export const isJudging = (cognitiveFunction) => judgingCognitiveFunctions.indexOf(cognitiveFunction) > -1;
export const isPerceiving = (cognitiveFunction) => perceivingCognitiveFunctions.indexOf(cognitiveFunction) > -1;

export const getFunctionPreference = (cognitiveFunction) => cognitiveFunction[0];
export const getFunctionWithOppositeEnergyFlow = (cognitiveFunction) => {
    return getFunctionPreference(cognitiveFunction) + (isExtraverted(cognitiveFunction) ? I : E);
};

export const getPersonalityCognitiveFunctions = (personality) => {
    let primaryPreference, secondaryPreference;
    if (
        isJudger(personality) && isExtravertedPersonality(personality)
        || isPerceiver(personality) && isIntroverteddPersonality(personality)
    ) {
        primaryPreference = getJudgingPreference(personality);
        secondaryPreference = getPerceivingPreference(personality);
    }
    else {
        primaryPreference = getPerceivingPreference(personality);
        secondaryPreference = getJudgingPreference(personality);
    }
    const primaryEnergyFlow = getEnergyFlowPreference(personality);

    return [
        primaryPreference + primaryEnergyFlow.toLowerCase(),
        secondaryPreference + getOppositePreference(primaryEnergyFlow).toLowerCase(),
        getOppositePreference(secondaryPreference) + primaryEnergyFlow.toLowerCase(),
        getOppositePreference(primaryPreference) + getOppositePreference(primaryEnergyFlow).toLowerCase()
    ];
};
