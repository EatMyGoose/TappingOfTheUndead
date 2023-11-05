import React from 'react';
import { IGameState, cloneGameState, initialGameState } from '../types/IGameState';
import { IUserInputs } from '../types/IUserInputs';

export function useGameLoop(inputs: IUserInputs)
{
    const timeMillis = React.useRef<number>(performance.now());
    const [gameState, setGameState] = React.useState<IGameState>(initialGameState);

    function GameLoop()
    {
      const currentTime = performance.now();
      const timeDelta = currentTime - timeMillis.current;
  
      setGameState(prevGamestate => {
        const timeS: number = currentTime / 1000;
        const deltaS: number = timeDelta / 1000;

        const nextGameState = cloneGameState(prevGamestate);
        
        nextGameState.enemyController.update(prevGamestate, nextGameState, timeS, deltaS);

        nextGameState.player.receive_inputs(inputs);
  
        nextGameState.player.update(prevGamestate, nextGameState, timeS, deltaS);
  
        nextGameState.enemies.forEach(e => e.update(prevGamestate, nextGameState, timeS, deltaS));
        nextGameState.explosions.forEach(e => e.update(prevGamestate, nextGameState, timeS, deltaS));
        nextGameState.jumpscares.forEach(e => e.update(prevGamestate, nextGameState, timeS, deltaS));
  
        nextGameState.recticle.update(prevGamestate, nextGameState, timeS, deltaS);

        nextGameState.morseListener.update(prevGamestate, nextGameState, timeS, deltaS);

        nextGameState.morseInputDisplay.update(prevGamestate, nextGameState, timeS, deltaS);
        
        nextGameState.screenShake.update(prevGamestate, nextGameState, timeS, deltaS);

        return nextGameState;
      });
      
      timeMillis.current = currentTime;
  
      window.requestAnimationFrame(GameLoop);
    }

    React.useEffect(
        () => { window.requestAnimationFrame(GameLoop);}, 
        []
    );

    return gameState;
}