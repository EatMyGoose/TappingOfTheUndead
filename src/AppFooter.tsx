import "./AppFooter.css"

interface IAppFooter
{
    onDotInput: (pressed: boolean) => void;
    onDashInput: (pressed: boolean) => void;
}

export function AppFooter(props: IAppFooter)
{
    return (
        <footer className="show-xs">
            <div className="footer-vertical-padding">
                <div className="container footer-button-flex-spread">
                    <button 
                        className="secondary outline footer-padded-full-width"
                        onMouseDown={() => props.onDotInput(true)}
                        onTouchStart={() => props.onDotInput(true)}
                        onMouseUp={() => props.onDotInput(false)}
                        onTouchEnd={() => props.onDotInput(false)}
                    >
                        <h3 className="footer-no-padding-or-margin">·</h3>
                    </button>    
                    <button 
                        className="secondary outline footer-padded-full-width"
                        onMouseDown={() => props.onDashInput(true)}
                        onTouchStart={() => props.onDashInput(true)}
                        onMouseUp={() => props.onDashInput(false)}
                        onTouchEnd={() => props.onDashInput(false)}
                    >
                        <h3 className="footer-no-padding-or-margin">—</h3>
                    </button>
                </div>
            </div>
        </footer>
    )
}