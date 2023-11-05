import { CentredAnimatedSprite } from "./CentredAnimatedSprite"

export interface IDisapprovingGoose
{
    width: number
    height: number
}

const SPRITE_WIDTH = 1000;
const SPRITE_HEIGHT = 1000;

const rowCol: [number,number][] = [
    [0, 0],
    [0, 1],

    [1, 0],
    [1, 1]
];

export function DisapprovingGoose(props :IDisapprovingGoose)
{
    return (
        <CentredAnimatedSprite

            spriteHeightPx={SPRITE_HEIGHT}
            spriteWidthPx={SPRITE_WIDTH}

            width={props.width}
            height={props.height}

            spriteSheetUrl="ThousandYardStareGoose.png"

            frameRate={8}

            animationRowCol={rowCol}
        />
    )
}