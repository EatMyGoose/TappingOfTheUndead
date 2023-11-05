import { letter_2_morse_map } from "./mapping"

export enum ENMatch
{
    mismatch = 0,
    full_match = 1,
    prefix = 2
};

export function morse_match(targetChar: string, currentSequence: string): ENMatch
{
    const expectedSequence = letter_2_morse_map.get(targetChar.toLowerCase()) as string;
    if(expectedSequence === undefined) return ENMatch.mismatch;
    
    if(expectedSequence === currentSequence) return ENMatch.full_match;
    else if(expectedSequence.indexOf(currentSequence) === 0) return ENMatch.prefix;
    else return ENMatch.mismatch
}