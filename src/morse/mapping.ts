
export const letter_2_morse: [string,string][] = (
    [
        ["a", ".-"],
        ["b", "-..."],
        ["c", "-.-."],
        ["d", "-.."],
        ["e", "."],
        ["f", "..-."],
        ["g", "--."],
        ["h", "...."],
        ["i", ".."],
        ["j", ".---"],
        ["k", "-.-"],
        ["l", ".-.."],
        ["m", "--"],
        ["n", "-."],
        ["o", "---"],
        ["p", ".--."],
        ["q", "--.-"],
        ["r", ".-."],
        ["s", "..."],
        ["t", "-"],
        ["u", "..-"],
        ["v", "...-"],
        ["w", ".--"],
        ["x", "-..-"],
        ["y", "-.--"],
        ["z", "--.."],
    ]
);

export const letter_2_morse_map = new Map<string, string>(
    letter_2_morse
);

export const morse_2_letter_map = new Map<string, string>(
    letter_2_morse.map(([letter, morse]) => [morse, letter])
);

console.assert(letter_2_morse_map.size === 26);
console.assert(morse_2_letter_map.size === 26);