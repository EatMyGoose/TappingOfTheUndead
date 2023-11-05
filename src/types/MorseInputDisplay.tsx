import React from "react";

import { Transform } from "konva/lib/Util";
import { IEntity } from "./IEntity";
import { IRenderable } from "./IRenderable";
import { IGameState } from "./IGameState";
import { Group, Text} from 'react-konva';
import { ApplyTransform, CappedFrac } from "../util/matrix";

export class MorseInputDisplay implements IRenderable, IEntity
{
    static animationTime: number = 0.1;

    x: number = 0;
    y: number = 0;

    currentSequence: string = ""
    timeSinceLastChange: number = 0;

    visible: boolean = false;

    static clone(other: MorseInputDisplay)
    {
        let copy = new MorseInputDisplay();
        copy.x = other.x;
        copy.y = other.y;
        copy.currentSequence = other.currentSequence;
        copy.timeSinceLastChange = other.timeSinceLastChange;
        copy.visible = other.visible;

        return copy;
    }

    update( 
        prevGameState: IGameState, 
        currentGameState: IGameState, 
        currentTimeS: number, 
        timeDeltaS: number): void
    {
        const prevString = prevGameState.morseListener.currentMorseCharSequence;
        this.currentSequence = currentGameState.morseListener.currentMorseCharSequence;       

        if(prevString !== this.currentSequence)
        {
            this.timeSinceLastChange = 0;
        }

        this.timeSinceLastChange += timeDeltaS;
        this.visible = currentGameState.recticle.visible;

        this.x = currentGameState.recticle.x;
        this.y = currentGameState.recticle.y;
    }

    render(world2Client: Transform): React.ReactNode
    {
        if(!this.visible) return (<></>);

        const width: number = 0.5;
        const height: number = 0.3;
        
        const xform = ApplyTransform(
            world2Client,
            this.x,
            this.y,
        );
        
        const scale = 1 + (
            (1 - CappedFrac(MorseInputDisplay.animationTime, this.timeSinceLastChange)) *
            0.3
        );


        return (
            <Group {...xform}>
                <Text 
                    text={this.currentSequence}
                    fontSize={0.10 * scale}
                    fontFamily="Courier New"
                    fontStyle="bold"
                    align="center"
                    verticalAlign="middle"

                    y={-height / 2}
                    x={-width / 2}
                    width={width}
                    height={height}
                />
            </Group>
        )   
    }
}