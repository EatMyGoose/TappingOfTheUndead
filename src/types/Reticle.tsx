import { IEntity } from "./IEntity";
import { IGameState, get_enemy } from "./IGameState";
import { IRenderable } from "./IRenderable";

import { Group } from 'react-konva';
import { Transform } from "konva/lib/Util";
import { ApplyTransform, CappedFrac, CosineSimilarity, MinElementIndex} from "../util/matrix";
import { Enemy } from "./Enemy";
import { ReticleSprite } from "./ReticleSprite";

export class Recticle implements IRenderable, IEntity
{
    enemyId: number = -1; 
    rotationDeg: number = 0;
    
    x: number = 0;
    y: number = 0;

    visible: boolean = false;

    timeSinceLastChange: number = 0;

    static clone(other: Recticle) : Recticle
    {
        const copy = new Recticle();
        copy.enemyId = other.enemyId;
        copy.rotationDeg = other.rotationDeg;
        copy.x = other.x;
        copy.y = other.y;
        copy.visible = other.visible;
        copy.timeSinceLastChange = other.timeSinceLastChange;

        return copy;
    }

    static getClosestEnemyId(playerX:number, playerY:number, enemies: Enemy[]) : number
    {
        const index = MinElementIndex(enemies, (e: Enemy) => Math.hypot(playerX - e.x, playerY - e.y));

        if(index < 0) return -1;
        else return enemies[index].id;
    }

    static getClosestEnemyIdTo(
        x: number, y: number, 
        xDir: number, yDir: number, 
        excludedId: number, enemies: Enemy[]) : number
    {
        const filtered: Enemy[] = enemies.filter(e => (e.id !== excludedId));

        const index = MinElementIndex(filtered, (e:Enemy) => {
            
            const xDelta = e.x - x;
            const yDelta = e.y - y;

            const dist = Math.hypot(xDelta, yDelta);
            
            return -CosineSimilarity(xDir, yDir, xDelta, yDelta) + dist;
        });

        if(index < 0) return -1;

        return filtered[index].id;
    }

    set_id(newTargetId: number)
    {
        this.enemyId = newTargetId;
        this.visible = true;
        this.timeSinceLastChange = 0;
    }

    update(prevGameState: IGameState, currentGameState: IGameState, currentTimeS: number, timeDeltaS: number): void
    {
        const rotSpeed = 40;

        this.timeSinceLastChange += timeDeltaS;
        const target: Enemy|undefined = get_enemy(this.enemyId, currentGameState);
        
        if(target === undefined)
        {
            this.visible = false;
            this.enemyId = -1;
        }
        else
        {
            this.visible = true;
            this.x = target.x;
            this.y = target.y;
            this.rotationDeg += timeDeltaS * rotSpeed;
            this.rotationDeg %= 360;
        }
    }

    render(world2Client: Transform): React.ReactNode
    {
        const width = 0.3;
        const height = 0.2;

        const xform = ApplyTransform(
            world2Client,
            this.x, 
            this.y
        );
        
        if(!this.visible) return (<></>)

        const scale = 1 + (
            (1 - CappedFrac(0.2, this.timeSinceLastChange)) *
            0.2
        );

        return (
            <Group
                {...xform}
            >
                <Group 
                    scaleX={scale}
                    scaleY={scale}
                    rotation={this.rotationDeg}
                >
                    <Group
                        x={width * 0.2}
                        y={height * 0.2}
                        rotation={90}
                    >
                        <ReticleSprite
                            width={0.2}
                            height={0.2}
                        />
                    </Group>
                    <Group
                        x={-width * 0.2}
                        y={-height * 0.2}
                        rotation={-90}
                    >
                        <ReticleSprite
                            width={0.2}
                            height={0.2}
                        />
                    </Group>
                </Group>
            </Group>
        )
    }
}