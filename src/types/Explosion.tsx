import React from "react";

import { Transform } from "konva/lib/Util";
import { IEntity } from "./IEntity";
import { IGameState } from "./IGameState";
import { IRenderable } from "./IRenderable";

import {Group, Text} from 'react-konva';
import { ApplyTransform } from "../util/matrix";
import { IDiposable } from "./IDisposable";
import { ExplosionSprite } from "./ExplosionSprite";


const explosionTextList: string[] = [
    "Kaboom!",
    "Boom!",
    "Poof!",
    "Pop!",
    "Oops!",  
    "Bam!"
];

export class Explosion implements IRenderable, IEntity, IDiposable
{
    x: number = 0;
    y: number = 0;

    text: string = "";

    dispose: boolean = false;
    timeAlive: number = 0;

    static maxTime: number = 2;

    static make(x: number, y: number) : Explosion
    {
        const explosion = new Explosion();
        explosion.x = x;
        explosion.y = y;
        explosion.text = Explosion.GetRandomExplosionText();
        return explosion; 
    }

    static clone(other: Explosion) : Explosion
    {
        const copy = new Explosion();
        copy.x = other.x;
        copy.y = other.y;
        copy.dispose = other.dispose;
        copy.timeAlive = other.timeAlive;
        copy.text = other.text;

        return copy;
    }

    private static get_opacity(timeAlive: number): number
    {
        return (Math.max(Explosion.maxTime - timeAlive, 0) / Explosion.maxTime) ** 0.4;
    }

    private static GetRandomExplosionText() : string
    {
        const idx = Math.floor(Math.random() * explosionTextList.length);
        return explosionTextList[idx];
    }

    update( prevGameState: IGameState, 
            currentGameState: IGameState, 
            currentTimeS: number, 
            timeDeltaS: number): void
    {
        this.timeAlive += timeDeltaS;

        if(this.timeAlive > Explosion.maxTime)
        {
            this.dispose = true;
        }
    }

    render(world2Client: Transform): React.ReactNode
    {
        const width = 0.5;
        const height = 0.3;

        const xform = ApplyTransform(
            world2Client,
            this.x,
            this.y,
        )
        
        const opacity = Explosion.get_opacity(this.timeAlive);
        return (
            <Group
                {...xform}
            >
                <Group y={-0.1}>
                    <ExplosionSprite frameRate={8}/>
                </Group>
                <Text
                    text={this.text}
                    fontSize={0.10}
                    fontFamily="Courier New" 

                    align="center"
                    verticalAlign="middle"

                    opacity={opacity}

                    y={-height / 2}
                    x={-width / 2}
                    width={width}
                    height={height}
                />
            </Group>
        )
    }
}