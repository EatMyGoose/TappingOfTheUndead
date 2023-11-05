import { Transform } from "konva/lib/Util";
import { ApplyTransform } from "../util/matrix";

import { Group, Text} from 'react-konva';
import { IRenderable } from "./IRenderable";
import { VIEWPORT_WIDTH } from "../constants";

export class Scoreboard implements IRenderable
{
    hits: number = 0
    misses: number = 0

    static clone(other:Scoreboard): Scoreboard
    {
        let copy = new Scoreboard();
        copy.hits = other.hits;
        copy.misses = other.misses;
        return copy;
    }

    private static Rightpad3Digits(n: number): string
    {
        const strRepresentation: string = n.toString();
        const spacesToPad: number = Math.max(3 - strRepresentation.length, 0);

        return strRepresentation + " ".repeat(spacesToPad);
    }
    AddHit()
    {
        this.hits += 1;
    }

    AddMiss()
    {
        this.misses += 1;
    }

    render(world2Client: Transform): React.ReactNode
    {
        const width = 1;
        const xform = ApplyTransform(
            world2Client,
            VIEWPORT_WIDTH / 2, 
            -1
        );
        
        const text  = (
            `Exterminated:${Scoreboard.Rightpad3Digits(this.hits)}\n` + 
            `Missed:${Scoreboard.Rightpad3Digits(this.misses)}`
        );

        return (
            <Group {...xform}>
                <Text 
                    text={text}
                    align="right"
                    verticalAlign="top"
                    fontFamily="Courier new"
                    fontSize={0.05}
                    width={width}
                    x={-width}
                    padding={0.01}
                />
            </Group>
        )
    }
}