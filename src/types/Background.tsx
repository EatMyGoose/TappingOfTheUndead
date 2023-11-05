import React from "react"

import { ApplyTransform } from "../util/matrix";
import { IRenderable } from "./IRenderable";
import { Transform } from "konva/lib/Util";
import { Rect, Group} from "react-konva";
import { VIEWPORT_WIDTH } from "../constants";
import { SpinningSpinningRats } from "./SpinningSpinningRats";

export class Background implements IRenderable
{
    static clone(other: Background) : Background
    {
        let copy = new Background();
        return copy;
    }

    render(world2Client: Transform): React.ReactNode
    {
        const width = VIEWPORT_WIDTH;
        const height = 2;
        const xform = ApplyTransform(
            world2Client,
            0,
            0,
        );

        return (
            <>
                <Group {...xform}>
                    <SpinningSpinningRats/>
                    <Rect
                        width={width}
                        height={height}
                        fill={"white"}
                        shadowColor="black"
                        shadowEnabled={true}
                        shadowBlur={0.1}
                        shadowOpacity={0.7}
                        x={-width/2}
                        y={-height/2}
                    />
                </Group>
            </>
        )
    }
}