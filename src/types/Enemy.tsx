import { Transform } from "konva/lib/Util";
import { IEntity } from "./IEntity";
import { IGameState } from "./IGameState";
import { IRenderable } from "./IRenderable";

import {Group, Text} from 'react-konva';
import { ApplyTransform } from "../util/matrix";
import { IDiposable } from "./IDisposable";
import { Explosion } from "./Explosion";
import { SpinningRatSprite } from "./SpinningRatSprite";
import { UniformDistribution } from "../util/random";
import { GooseJumpscare } from "./GooseJumpscare";

export class Enemy implements IRenderable, IEntity, IDiposable
{
    x: number = 0;
    y: number = -1.2;
    rotation: number = 0;
    alive: boolean = true; 
    dispose: boolean = false;
    ySpeed: number = 0;
    id: number = 0;
    str: string = ""

    framerate: number = 0;
    scale: number = 0;

    static make(startingX: number, speed: number, id: number, str: string)
    {
        const enemy = new Enemy();
        enemy.x = startingX;
        enemy.ySpeed = speed;
        enemy.id = id;
        enemy.str = str;

        enemy.framerate = UniformDistribution(6, 18);
        enemy.scale = UniformDistribution(0.7, 1.3);

        return enemy;
    }

    static find_by_id(arr: Enemy[], id: number) : Enemy | undefined
    {
        return arr.find((e: Enemy) => e.id === id);
    }

    static clone(other: Enemy) : Enemy
    {
        let copy = new Enemy();

        copy.id = other.id;
        copy.x = other.x;
        copy.y = other.y;
        copy.ySpeed = other.ySpeed;
        copy.rotation = other.rotation;

        copy.alive = other.alive;
        copy.str = other.str
        copy.framerate = other.framerate;
        copy.scale = other.scale;

        return copy;
    }

    destroy()
    {
        this.alive = false;
    }

    update( prevGameState: IGameState, 
            currentGameState: IGameState, 
            currentTimeS: number, 
            timeDeltaS: number): void
    {
        if(!this.alive)
        {
            currentGameState.explosions.push(Explosion.make(this.x, this.y));
            currentGameState.screenShake.reset();                                                                                        
            currentGameState.scoreboard.AddHit();
            this.dispose = true;
            return;
        }

        this.y += timeDeltaS * this.ySpeed;
        
        this.rotation += 1480 * timeDeltaS;
        this.rotation %= 360;

        if(this.y > 1.02)
        {
            currentGameState.screenShake.reset();
            currentGameState.jumpscares.push(new GooseJumpscare());
            currentGameState.scoreboard.AddMiss();
            this.dispose = true;
        }
    }

    render(world2Client: Transform): React.ReactNode
    {
        const height = 0.1;

        const xform = ApplyTransform(
            world2Client,
            this.x,
            this.y,
        )

        const bottomTextWidth = 0.5;
       
        return (
            <Group
                {...xform}
            >
                <Group 
                    scaleX={this.scale} 
                    scaleY={this.scale}
                    x={-0.02}
                >
                    <SpinningRatSprite
                        width={0.3}
                        height={0.3 * 0.895}
                        framerate={this.framerate}
                    />
                </Group>
                <Text
                    text={this.str}
                    fontSize={0.07}
                    fontFamily="Courier New" 
                    align="center"
                    verticalAlign="middle"

                    y={height / 2}
                    x={-bottomTextWidth / 2}
                    width={bottomTextWidth}
                />
            </Group> 
        );
    }
    
}