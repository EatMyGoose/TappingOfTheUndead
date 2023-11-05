import { Transform } from "konva/lib/Util";
import { IRenderable } from "./IRenderable";

import { Text } from 'react-konva';

export class FPSCounter implements IRenderable
{
    prevFrameTimes: number[] = [];
    visible: boolean = true;

    static clone(other: FPSCounter) : FPSCounter
    {
        let copy = new FPSCounter();
        copy.prevFrameTimes = [...other.prevFrameTimes];
        copy.visible = other.visible;

        return copy;
    }

    render(world2Client: Transform): React.ReactNode
    {
        this.prevFrameTimes.push(performance.now());
        while(this.prevFrameTimes.length > 200)
        {
            this.prevFrameTimes.shift();
        }
        
        const nFrames = this.prevFrameTimes.length;

        const elapsedMillis = (nFrames > 0?
            (this.prevFrameTimes.at(-1) as number) - (this.prevFrameTimes.at(0) as number):
            1000
        );

        const fps = nFrames / (elapsedMillis / 1000);

        return (
            <Text text={`FPS:${fps.toFixed(1)}`} fontSize={14} x={5} y={5}></Text>
        )
    }
}