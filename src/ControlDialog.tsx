import { letter_2_morse } from "./morse/mapping";

const columns: [[string, string], [string, string]][] = (
    letter_2_morse.slice(0, 13).map(
        (letterAndMorse, idx) => {
            return [letterAndMorse, letter_2_morse[13 + idx]]
        }
    )
);

function MorseCodeTable()
{
    
    return (
        <table className="striped">
            <thead data-theme="light">
                <tr>
                    <th scope="col">Letter</th>
                    <th scope="col">Morse</th>
                    <th scope="col">Letter</th>
                    <th scope="col">Morse</th>
                </tr>
            </thead>
            <tbody>
            {
                columns.map((colInfo, idx) => {
                    const [left, right] = colInfo;
                    const [leftLetter, leftCode] = left;
                    const [rightLetter, rigthCode] = right;
                    return (
                        <tr key={idx}>
                            <td><strong>{leftLetter.toUpperCase()}</strong></td>
                            <td><kbd>{leftCode}</kbd></td>
                            <td><strong>{rightLetter.toUpperCase()}</strong></td>
                            <td><kbd>{rigthCode}</kbd></td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>  
    );
}

export function ControlDialog(props: {onClose:()=>void})
{
    return (
        <dialog open>
            <article>
                <h2>
                    Tapping of the undead
                </h2>
                <div className="container">
                    <p>Exterminate the horizontally spinning rats by tapping the correct morse-code signal.</p>    
                </div>
                <h2>
                    Controls
                </h2>
                <div className="container">
                    <ul>
                        <li><kbd>WASD</kbd> - Switch target</li>
                        <li><kbd>i</kbd> - Dit (short burst)</li>
                        <li><kbd>j</kbd> - Dah (long tone)</li>
                    </ul>
                </div>
                
                <details>
                    <summary role="button" className="outline contrast">Morse Code Table</summary>
                    <MorseCodeTable/>
                </details>
                
                <footer>
                    <input type="button" 
                        onClick={props.onClose} 
                        className="secondary"
                        value="Close"
                    />
                </footer>
            </article>    
        </dialog>
    )
}