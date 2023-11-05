interface IDecayProfile
{
    sustainValue: number;   //Amplitude during sustain period
    sustainEndTime: number; //seconds (start of when the value exponentially drops to 0)
    decayEndTime: number;   //seconds (time when the value reaches 0)
}

export interface IWaveComponent extends IDecayProfile
{
    frequency: number
}

export function make_IWaveComponent(
    sustainValue: number,
    sustainEndTime: number,
    decayEndTime: number,
    frequency: number)
{
    return {
        sustainValue,
        sustainEndTime,
        decayEndTime,
        frequency
    }
}

function GetAmplitude(profile: IDecayProfile, timeSeconds: number) : number
{
    if(timeSeconds <= profile.sustainEndTime) return profile.sustainValue;
    else if(timeSeconds <= profile.decayEndTime)
    {
        const decayDuration = (profile.sustainEndTime - profile.decayEndTime);
        const timeSinceStartOfDecay = timeSeconds - profile.sustainEndTime;
        const frac = 1 - (
            timeSinceStartOfDecay / 
            decayDuration
        );

        const fracSqrt = frac ** 0.5;

        return profile.sustainValue * fracSqrt;
    }
    else
    {
        return 0
    }
}

function GetWaveAmplitude(wave: IWaveComponent, timeSeconds:number)
{
    const amplitude = GetAmplitude(wave, timeSeconds);
    const sin = Math.sin(timeSeconds * wave.frequency * 2 * Math.PI);
    return (
        (Math.sign(sin) * Math.abs(sin) ** 0.2) * 
        amplitude
    );
}

export function GetCombinedWaveAmplitude(profiles: IWaveComponent[], timeSeconds:number)
{
    let acc: number = 0;

    for(const p of profiles)
    {
        acc += GetWaveAmplitude(p, timeSeconds);
    }

    return acc;
}

