import React from "react"
import { useImage } from "../hooks/useImage"

import { Sprite } from 'react-konva';
import Konva from "konva";
import { GetGridCoord } from "../util/matrix";

interface ICentredAnimatedSprite
{
    spriteWidthPx: number,
    spriteHeightPx: number,

    width: number,
    height: number,

    spriteSheetUrl: string

    frameRate: number

    animationRowCol: [number, number][]

    frameIndex?: number
}

export function CentredAnimatedSprite(props: ICentredAnimatedSprite)
{
    const spriteRef = React.useRef<Konva.Sprite>(null);

    const spriteSheet = useImage(
        props.spriteSheetUrl, 
        ()=>{
            if(spriteRef.current) spriteRef.current.start()
        }
    );

    const animations: {"animation": number[]} = React.useMemo(
        () => {
            const positions = props.animationRowCol.flatMap(
                (rowCol) => GetGridCoord(props.spriteWidthPx, props.spriteHeightPx, rowCol[0], rowCol[1])
            );
            return {"animation": positions};
        }, [props.spriteWidthPx, props.spriteHeightPx, props.animationRowCol]
    );

    const xScale = props.width / props.spriteWidthPx;
    const yScale = props.height / props.spriteHeightPx;

    const frameRate = (
        props.frameIndex === undefined? 
        props.frameRate : 
        1e-3
    );

    if(spriteRef.current && props.frameIndex)
    {
        spriteRef.current.frameIndex(props.frameIndex);
    }

    return (
        <>
            <Sprite
                ref={spriteRef}
                image={spriteSheet as HTMLImageElement}
                animation="animation"
                animations={animations}
                frameRate={frameRate}

                x={-props.width / 2}
                y={-props.height / 2}

                scale={{x:xScale, y: yScale}}
            />
        </>
    );
}