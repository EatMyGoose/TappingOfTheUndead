import React from "react";
import { CentredAnimatedSprite } from "./CentredAnimatedSprite";

const SPRITE_WIDTH = 500;
const SPRITE_HEIGHT = 500;

const rowCol: [number, number][] = [
    [0, 0],
    [0, 1],
    [0, 2],

    [1, 0],
    [1, 1],
    [1, 2],

    [2, 0],
    [2, 1],
    [2, 2] //Blank image
]

export interface IExplosionSprite
{
    frameRate: number
}

interface IFrameTiming
{
    frameNo: number,
    msLeft: number,
    lastTime: number
}

export function ExplosionSprite(props: IExplosionSprite)
{
    const frameTimingRef = React.useRef<IFrameTiming>({
        frameNo: 0,
        msLeft: 1000 / props.frameRate,
        lastTime: performance.now()
    });
    
    let frameTiming = frameTimingRef.current;

    const msPerFrame: number = 1000 / props.frameRate;
    const currentTime: number = performance.now();
    const delta: number = currentTime - frameTiming.lastTime;
    const lastFrameIdx: number = rowCol.length - 1;

    frameTiming.msLeft -= delta;
    while(frameTiming.msLeft < 0)
    {
        frameTiming.frameNo += 1;
        frameTiming.msLeft += msPerFrame;    
    }

    frameTiming.frameNo = Math.min(lastFrameIdx, frameTiming.frameNo);
    frameTiming.lastTime = currentTime;

    return (
        <>
            <CentredAnimatedSprite
                spriteWidthPx={SPRITE_WIDTH}
                spriteHeightPx={SPRITE_HEIGHT}

                width={0.4}
                height={0.4}

                spriteSheetUrl="Explosion.png"

                frameRate={0} //framerate does not matter, frameIndex overrides it

                animationRowCol={rowCol}

                frameIndex={frameTiming.frameNo}
            />
        </>
    );
}
