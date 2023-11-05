
export function OnRisingPulse(newState: boolean, oldState: boolean)
{
    return newState === true && oldState === false;
}