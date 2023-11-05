import React from "react"
import { Transform } from "konva/lib/Util";

export interface IRenderable   
{
    render: (world2Client: Transform) => React.ReactNode
}