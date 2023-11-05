import { Group } from "react-konva";
import { SpinningRatSprite } from "./SpinningRatSprite";

function GetEquallySpacedRotations(divisions: number): number[]
{
    const interval = 360 / divisions;

    let angles: number[] = [];
    for(let i = 0; i < divisions; i++)
    {
        angles.push(interval * i);
    }
    return angles;
}

interface IRatRing
{
    ratsPerRing: number
    msPerRevolution: number
    framerate: number
    ratSize: number
    radius: number
}

function RatRing(props: IRatRing)
{
    const intervals = GetEquallySpacedRotations(props.ratsPerRing);
    const rotationalOffset = (
        (   
            (performance.now() % props.msPerRevolution) / 
            props.msPerRevolution
        ) 
        * 360
    );

    return (
        <>
            {
                intervals.map((angle, idx) => {
                    return (
                        <Group key={idx} rotation={angle + rotationalOffset}>
                            <Group y={props.radius}>
                                <SpinningRatSprite
                                    width={props.ratSize}
                                    height={props.ratSize}
                                    framerate={props.framerate}
                                />
                            </Group>
                        </Group>
                    )
                })
            }
        </>
    )
}

export function SpinningSpinningRats()
{
    return (
        <>
            <RatRing 
                ratsPerRing={10}
                msPerRevolution={100000}
                framerate={9}
                ratSize={0.5}
                radius={0.75}
                key={-1}
            />
            <RatRing 
                ratsPerRing={16}
                msPerRevolution={100000}
                framerate={8}
                ratSize={0.5}
                radius={1}
                key={0}
            />
            <RatRing 
                ratsPerRing={22}
                msPerRevolution={120000}
                framerate={7}
                ratSize={0.5}
                radius={1.3}
                key={1}
            />
            <RatRing 
                ratsPerRing={24}
                msPerRevolution={130000}
                framerate={6}
                ratSize={0.5}
                radius={1.6}
                key={2}
            />
            <RatRing 
                ratsPerRing={26}
                msPerRevolution={140000}
                framerate={5}
                ratSize={0.5}
                radius={1.9}
                key={3}
            />
        </>
    )
}