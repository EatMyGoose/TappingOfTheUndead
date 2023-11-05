import React from 'react';
import './App.css';
import "@picocss/pico"
import { AppHeader } from './AppHeader';
import { Stage, Layer, Group } from 'react-konva';
import { GetWorld2ClientXForm } from './util/matrix';
import { useGameLoop } from './hooks/useGameLoop';
import { useInput } from './hooks/useInput';


function App() {
  const inputs = useInput();
  const gameState = useGameLoop(inputs.current);

  const parentRef = React.useRef<HTMLElement | null>(null);

  const [width, height] = (
    parentRef.current? 
      [parentRef.current.offsetWidth, parentRef.current.offsetHeight] :
      [100, 100]
  );

  const world2Client = GetWorld2ClientXForm(
    width, 
    height, 
    gameState.screenShake.xOffset,
    0
  );

  const canvas = (
    <>
      {gameState.background.render(world2Client)}
      {gameState.player.render(world2Client)}
      {gameState.enemies.map((e, idx) => <Group key={idx}>{e.render(world2Client)}</Group>)}
      {gameState.explosions.map((e, idx) => <Group key={idx}>{e.render(world2Client)}</Group>)}
      {gameState.jumpscares.map((e, idx) => <Group key={idx}>{e.render(world2Client)}</Group>)}
      {gameState.recticle.render(world2Client)}
      {gameState.morseInputDisplay.render(world2Client)}
      {gameState.scoreboard.render(world2Client)}
      {gameState.fpsCounter.render(world2Client)}
    </>
  )
  return (
    <div>
      <AppHeader/>

      <article style={{padding:10}}>
        <main className="container" ref={parentRef}>
        <Stage className='main-canvas' width={width} height={height} style={{backgroundColor:"rgba(255,255,255,0.9"}}>
          <Layer>
            {canvas}
          </Layer>
        </Stage>
        </main>
      </article>
    </div>
  );
}

export default App;
