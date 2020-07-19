
const seed = xmur3("boop");

export default sfc32(seed(), seed(), seed(), seed());

/**
 * Produces a new "random" 32-bit hash value to be used as a seed in a PRNG
 * https://stackoverflow.com/a/47593316
 * @param seed 
 */
function xmur3(seed: string) {
    for (var i = 0, h = 1779033703 ^ seed.length; i < seed.length; i++)
        h = Math.imul(h ^ seed.charCodeAt(i), 3432918353),
            h = h << 13 | h >>> 19;
    return function () {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

/**
 * Simple Fast Counter pseudorandom number generator 
 * https://stackoverflow.com/a/47593316
 * @param a 
 * @param b 
 * @param c 
 * @param d 
 */
function sfc32(a: number, b: number, c: number, d: number) {
    return function () {
        a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
        var t = (a + b) | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        d = d + 1 | 0;
        t = t + d | 0;
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}