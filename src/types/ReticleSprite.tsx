import { CentredAnimatedSprite } from './CentredAnimatedSprite';

interface IReticleSprite
{
    width: number;
    height: number;
}

const SPRITE_WIDTH = 300;
const SPRITE_HEIGHT = 300;

const rowCol: [number,number][] = [
    [0, 0],
    [0, 1],
    [0, 2],

    [1, 0],
    [1, 1],
];

export function ReticleSprite(props: IReticleSprite)
{
    return (
        <CentredAnimatedSprite
            spriteHeightPx={SPRITE_HEIGHT}
            spriteWidthPx={SPRITE_WIDTH}

            width={props.width}
            height={props.height}

            spriteSheetUrl="Reticle.png"

            frameRate={10}

            animationRowCol={rowCol}
        />
    );
}