import React from "react"
import { ControlDialog } from "./ControlDialog";

export function AppHeader()
{
    const [showControls, setShowControls] = React.useState<boolean>(false);

    const controlsDialog = (
        showControls?
            <ControlDialog onClose={() => setShowControls(false)}/>:
            undefined
    )
    return (
        <header>
                {controlsDialog}
                <nav className="container" >
                    <ul>
                        <li>
                            <h2 className="hide-xs">Tapping of the Undead</h2>
                            <h3 className="show-xs">Tapping of the Undead</h3>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <button 
                                className="secondary" 
                                onClick={()=>setShowControls(true)}
                            >
                                &nbsp;Controls&nbsp;
                            </button>
                        </li>
                    </ul>
                </nav>
        </header>
    )
}