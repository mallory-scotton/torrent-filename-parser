/** Regular expression to find complete version */
const COMPLETE_DVD_EXP  = /\b(NTSC|PAL)?.DVDR\b/i;
const COMPLETE_EXP      = /\b(COMPLETE)\b/i;

/**
 * Checks if a given title indicates a complete DVD.
 * @param {string} title - The title to check.
 * @returns {boolean | undefined} Returns `true` if the title indicates a complete DVD, `false` if not, or `undefined` if the input is invalid.
 */
export function isCompleteDvd(title: string): boolean | undefined {
    return COMPLETE_DVD_EXP.test(title) || undefined;
}

/**
 * Checks if a given title indicates completeness.
 * @param {string} title - The title to check.
 * @returns {boolean | undefined} Returns `true` if the title indicates completeness, `false` if not, or `undefined` if the input is invalid.
 */
export function isComplete(title: string): boolean | undefined {
    return COMPLETE_EXP.test(title) || isCompleteDvd(title) || undefined;
}
