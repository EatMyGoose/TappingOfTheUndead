import { GetRandomWord } from "../morse/wordList";
import { CappedLerp } from "../util/matrix";
import { UniformDistribution } from "../util/random";
import { Enemy } from "./Enemy";
import { IEntity } from "./IEntity";
import { IGameState } from "./IGameState";


export class EnemyController implements IEntity
{
    nextEnemyId = 0;
    timeToNextEnemy = 0.1; //seconds

    static clone(other: EnemyController) : EnemyController
    {
        let copy = new EnemyController();
        copy.nextEnemyId = other.nextEnemyId;
        copy.timeToNextEnemy = other.timeToNextEnemy;
        return copy;
    }

    private static GetUpperSpeed(currentTimeSeconds: number)
    {
        return CappedLerp(
            0.06, 20, 
            0.18, 120,
            currentTimeSeconds
        );
    }

    private static GetTimeToNextEnemy(currentTimeSeconds: number)
    {
        return CappedLerp(
            5, 20, 
            1.5, 120,
            currentTimeSeconds
        );
    }

    update( prevGameState: IGameState, 
            currentGameState: IGameState, 
            currentTimeS: number, 
            timeDeltaS: number): void
    {
        this.timeToNextEnemy -= timeDeltaS;

        if(this.timeToNextEnemy < 0)
        {
            this.timeToNextEnemy = EnemyController.GetTimeToNextEnemy(currentTimeS);
            
            const nextStartingX = UniformDistribution(-0.5, 0.5);
            const nextSpeed = UniformDistribution(
                0.05, 
                EnemyController.GetUpperSpeed(currentTimeS)
            );

            const randomStr = GetRandomWord();

            currentGameState.enemies.push(
                Enemy.make(
                    nextStartingX,
                    nextSpeed,
                    this.nextEnemyId,
                    randomStr
                )
            );

            this.nextEnemyId += 1;
        }
    }
}