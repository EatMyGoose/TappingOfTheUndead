import React from "react"
import { IEntity } from "./IEntity";
import { IRenderable } from "./IRenderable";
import { IGameState, get_enemy } from "./IGameState";

import { Transform } from "konva/lib/Util";
import { ENMatch, morse_match } from "../morse/decoder";

export class MorseListener implements IEntity, IRenderable
{
    currentCharIndex: number = 0;
    currentMorseCharSequence: string = "";
    
    pendingChar: string = "";

    static clone(other: MorseListener) : MorseListener
    {
        let copy = new MorseListener();

        copy.currentCharIndex = other.currentCharIndex;
        copy.currentMorseCharSequence = other.currentMorseCharSequence;
        copy.pendingChar = other.pendingChar;

        return copy;
    }

    reset() : void
    {
        this.currentCharIndex = 0;
        this.currentMorseCharSequence = "";
        this.pendingChar = "";
    }

    receive_morse(char: string) : void
    {
        this.pendingChar = char;
    }

    update( prevGameState: IGameState, 
            currentGameState: IGameState, 
            currentTimeS: number, 
            timeDeltaS: number): void
    {
        const prevTargetId = prevGameState.recticle.enemyId;
        const targetId = currentGameState.recticle.enemyId;
        const enemy = get_enemy(targetId, currentGameState);

        if(prevTargetId !== targetId)
        {
            this.reset();
        }

        if(enemy)
        {
            const matchStr = enemy.str;
            
            if(this.currentCharIndex >= matchStr.length)
            {
                enemy.destroy();
            }
            else if(this.pendingChar !== "")
            {
                const nextSequence = this.currentMorseCharSequence + this.pendingChar;
                
                const matchResult = morse_match(
                    matchStr[this.currentCharIndex], 
                    nextSequence
                );

                if(matchResult === ENMatch.mismatch)
                {
                    this.currentMorseCharSequence = "";
                }
                else if(matchResult === ENMatch.full_match)
                {
                    this.currentCharIndex += 1;
                    this.currentMorseCharSequence = "";
                }
                else if(matchResult === ENMatch.prefix)
                {
                    this.currentMorseCharSequence = nextSequence;
                }
            }
        }
        else
        {
            this.currentCharIndex = 0;
            this.currentMorseCharSequence = "";
        }

        this.pendingChar = "";
    }

    render(world2Client: Transform): React.ReactNode
    {
        return (<></>);
    }
}