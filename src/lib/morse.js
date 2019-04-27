// Forked from: https://github.com/zhikiri/js-morse
const map = {
    A: 13,
    B: 47,
    C: 43,
    D: 23,
    E: 7,
    F: 59,
    G: 19,
    H: 63,
    I: 15,
    J: 49,
    K: 21,
    L: 55,
    M: 9,
    N: 11,
    O: 17,
    P: 51,
    Q: 37,
    R: 27,
    S: 31,
    T: 5,
    U: 29,
    V: 61,
    W: 25,
    X: 45,
    Y: 41,
    Z: 39,
    1: 97,
    2: 113,
    3: 121,
    4: 125,
    5: 127,
    6: 95,
    7: 79,
    8: 71,
    9: 67,
    0: 65,
    ' ': 0,
};

const markup = {
    dot: '.',
    dash: '-',
    space: ' ',
    sentanceSpace: '/',
};

const byLetter = markup.space;
const byWord = markup.sentanceSpace;


export function encode(text) {
    return text.toUpperCase().split('')
        .map(letter => letterToMarkup(map[normalize(letter)]).join(''))
        .join(byLetter);
}

export function decode(code) {
    return code.split(byWord)
        .map(encoded => getWordFromMarkup(encoded))
        .join(' ');
}

function normalize(letter) {
    return letter.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function getMarkup(letter) {
    return letter.toString(2).split('').slice(1, -1);
}

function getWordFromMarkup(code) {
    return code.split(byLetter)
        .filter(String)
        .map(letter => letterFromMarkup(letter))
        .join('');
}

function getLetter(code) {
    return Object.keys(map)
        .find(letter => map[letter].toString(2) === `1${code}1`);
}

function letterToMarkup(letter) {
    return !letter
        ? [byWord]
        : getMarkup(letter).map(point => point === '1' ? markup.dot : markup.dash);
}

function letterFromMarkup(code) {
    return getLetter(
        code.split('')
            .map(ch => ch === markup.dot)
            .map(Number)
            .join(''),
    );
}