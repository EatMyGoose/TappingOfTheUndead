
export function UniformDistribution(lower: number, upper: number) : number
{
    return (Math.random() * (upper - lower)) + lower;
}