import { IGameState } from "./IGameState";

export interface IEntity
{
    update:(    prevGameState: IGameState, 
                currentGameState: IGameState, 
                currentTimeS: number, 
                timeDeltaS: number) => void
}