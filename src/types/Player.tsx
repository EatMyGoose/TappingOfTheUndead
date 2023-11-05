import { IGameState } from "./IGameState";
import { IEntity } from "./IEntity";
import { IRenderable } from "./IRenderable";

import { IUserInputs, get_initial_inputs} from "./IUserInputs";
import { Transform } from "konva/lib/Util";
import { OnRisingPulse } from "../util/input";
import { Recticle } from "./Reticle";
import { Enemy } from "./Enemy";

export class Player implements IEntity, IRenderable
{
    x: number = 0
    y: number = 0.6

    alive: boolean = true

    user_input: IUserInputs = get_initial_inputs();

    static clone(other: Player) : Player
    {
        let copy = new Player();
        copy.x = other.x;
        copy.y = other.y;
        copy.alive = other.alive;
        copy.user_input = {...other.user_input};
        return copy;
    }

    receive_inputs(inputs: IUserInputs) : void
    {
        this.user_input = {
            ...inputs
        };
    }

    update( prevGameState: IGameState, 
            currentGameState: IGameState, 
            currentTimeS: number, 
            timeDeltaS: number): void
    {
        this.AutoLockon(currentGameState);
        this.HandleTargetChange(prevGameState, currentGameState);
        this.HandleMorseInput(prevGameState, currentGameState);
    }

    render(world2Client: Transform): React.ReactNode
    {
        return (<></>
        );
    }

    private AutoLockon(currentGameState: IGameState)
    {
        if(currentGameState.recticle.enemyId < 0)
        {
            const nextId = Recticle.getClosestEnemyId(this.x, this.y, currentGameState.enemies);

            if(nextId >= 0) currentGameState.recticle.set_id(nextId);
        }
    }

    private HandleMorseInput(prevGameState: IGameState, currentGameState: IGameState)
    {
        let char = "";
        if(OnRisingPulse(this.user_input.dot, prevGameState.player.user_input.dot))
        {
            char = ".";
        }
        else if(OnRisingPulse(this.user_input.dash, prevGameState.player.user_input.dash))
        {
            char = "-";
        }

        if(char !== "")
        {
            currentGameState.morseListener.receive_morse(char);
        }
    }

    private HandleTargetChange(prevGameState: IGameState, currentGameState: IGameState)
    {
        let xDir = 0;
        let yDir = 0;
        let switchingTarget: boolean = false;
        if(OnRisingPulse(this.user_input.left, prevGameState.player.user_input.left))
        {
            xDir += -1;
            switchingTarget = true;
        }

        if(OnRisingPulse(this.user_input.right, prevGameState.player.user_input.right))
        {
            xDir += 1;
            switchingTarget = true;
        }

        if(OnRisingPulse(this.user_input.up, prevGameState.player.user_input.up))
        {
            yDir += -1;
            switchingTarget = true;
        }

        if(OnRisingPulse(this.user_input.down, prevGameState.player.user_input.down))
        {
            yDir += 1;
            switchingTarget = true;
        }

        if(switchingTarget)
        {
            const prevTarget = Enemy.find_by_id( 
                currentGameState.enemies,
                prevGameState.recticle.enemyId
            );
            
            if(prevTarget === undefined)
            {
                currentGameState.recticle.set_id(
                    Recticle.getClosestEnemyId(this.x, this.y, currentGameState.enemies)
                );
            }
            else
            {
                const nextTarget = Recticle.getClosestEnemyIdTo(
                    prevTarget.x, prevTarget.y,
                    xDir, yDir,
                    prevTarget.id,
                    currentGameState.enemies
                );

                if(nextTarget >= 0)
                {
                    currentGameState.recticle.set_id(nextTarget);
                }
            }
        }
    }
}

