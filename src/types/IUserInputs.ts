
export interface IUserInputs
{
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean,

    action: boolean,

    dot: boolean,
    dash: boolean
}

export function make_user_inputs(up: boolean, down: boolean, left: boolean, right: boolean, action: boolean, dot: boolean, dash: boolean) : IUserInputs
{
    return {
        up,
        down,
        left,
        right,

        action,

        dot,
        dash
    }
}

export function get_initial_inputs()
{
    return make_user_inputs(false, false, false, false, false, false, false);
}