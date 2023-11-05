import { GetCombinedWaveAmplitude, IWaveComponent, make_IWaveComponent } from "../util/ShakeyWakey";
import { IEntity } from "./IEntity";
import { IGameState } from "./IGameState";

const screenShakeParams: IWaveComponent[] = [
    make_IWaveComponent(0.01, 0.05, 0.08, 10),
    make_IWaveComponent(0.008, 0.05, 0.08, 11),
    make_IWaveComponent(0.003, 0.05, 0.1, 14)
]


export class ScreenShakeController implements IEntity
{
    xOffset: number = 0;
    time: number = 1000;

    static clone(other: ScreenShakeController)
    {
        const copy = new ScreenShakeController();
        copy.xOffset = other.xOffset;
        copy.time = other.time;

        return copy;
    }

    reset()
    {
        this.time = 0;
    }

    update( prevGameState: IGameState, 
            currentGameState: IGameState, 
            currentTimeS: number, 
            timeDeltaS: number): void
    {
        this.time += timeDeltaS;

        this.xOffset = GetCombinedWaveAmplitude(
            screenShakeParams, 
            this.time 
        );
    }
}