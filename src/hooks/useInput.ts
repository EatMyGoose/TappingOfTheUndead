import React from 'react';
import { IUserInputs, get_initial_inputs } from '../types/IUserInputs';

export function useInput()
{
    const inputs = React.useRef<IUserInputs>(get_initial_inputs());

    function HandleKeyAction(character: string, newState: boolean)
    {
  
      switch(character)
      {
        case "w": {
          inputs.current.up = newState;
          break;
        }
        case "a": {
          inputs.current.left =newState;
          break;
        }
        case "s": {
          inputs.current.down = newState;
          break;
        }
        case "d": {
          inputs.current.right = newState;
          break;
        }

        case "j": {
            inputs.current.dot = newState;
            break;
        }
        case "k": {
            inputs.current.dash = newState;
            break;
        }
      }
    }

    React.useEffect(
        () => {
          const onKeyDown = (e: KeyboardEvent) => {HandleKeyAction(e.key, true)};
          const onKeyUp = (e: KeyboardEvent) => {HandleKeyAction(e.key, false)};
          
          window.addEventListener("keydown", onKeyDown);
          window.addEventListener("keyup", onKeyUp);
          return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
          }
        }, []
    );

    return inputs;
}