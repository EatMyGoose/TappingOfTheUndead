import { CentredAnimatedSprite } from "./CentredAnimatedSprite";

interface ISpinningRatSprite
{
    width : number,
    height: number,
    framerate: number
}

const SPRITE_WIDTH = 600;
const SPRITE_HEIGHT = 537;

const rowCol: [number,number][] = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],

    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],

    [2, 0],
    [2, 1],
    [2, 2]
];

export function SpinningRatSprite(props: ISpinningRatSprite)
{
    return (
        <CentredAnimatedSprite 
            spriteHeightPx={SPRITE_HEIGHT}
            spriteWidthPx={SPRITE_WIDTH}
            
            width={props.width}
            height={props.height}

            frameRate={props.framerate}

            animationRowCol={rowCol}

            spriteSheetUrl="RotoscopedSpinningRat.png"
        />
    )
}