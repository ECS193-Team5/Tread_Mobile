import hardCodedInfo from "./SharedHardCodeInfo.json";

export function convertProgress(progress, goal_unit) {
    return progress * hardCodedInfo.conversionKey[goal_unit];
}

export function getChallengeTitle(exercise){
    return exercise.exerciseName + " " + exercise.amount + " " + exercise.unit;
}

export function calculateProgress(myProgress, unit){
    return Math.round(convertProgress(myProgress, unit));
}