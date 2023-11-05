import { ApplyTransform, CappedFrac } from "../util/matrix";
import { DisapprovingGoose } from "./DisapprovingGoose";
import { IDiposable } from "./IDisposable";
import { IEntity } from "./IEntity";
import { IGameState } from "./IGameState";
import { IRenderable } from "./IRenderable";

import { Group } from 'react-konva';
import { Transform } from "konva/lib/Util";

export class GooseJumpscare implements IEntity, IRenderable, IDiposable
{
    static duration: number = 0.5 as const;
    static initialSize: number = 0.2 as const;

    time: number = 0;
    dispose: boolean = false;

    static clone(other: GooseJumpscare) : GooseJumpscare
    {
        let copy = new GooseJumpscare();
        copy.time = other.time;
        copy.dispose = other.dispose;
        return copy;
    }

    update( prevGameState: IGameState, 
            currentGameState: IGameState, 
            currentTimeS: number, 
            timeDeltaS: number): void
    {
        this.time += timeDeltaS;

        if(this.time > GooseJumpscare.duration)
        {
            this.dispose = true;
        }
    }

    render(world2Client: Transform): React.ReactNode
    {
        const frac = CappedFrac(GooseJumpscare.duration, this.time);
        const sizeMultiplier = 1 + 4 * (frac ** 0.5);
        const size = GooseJumpscare.initialSize * sizeMultiplier;
        const xform = ApplyTransform(
            world2Client,
            0, 
            1 - (size / 2)
        );

        return (
            <Group 
                opacity={ Math.max(1 - frac, 0) ** 1.2}
                {...xform}
            >
                <DisapprovingGoose  
                    width={size}
                    height={size}
                />
            </Group>
        )
    }
}