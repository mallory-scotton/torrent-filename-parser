/** Regular expression to find audio channels */
const CHANNEL_8_EXP: RegExp = /\b(?<eight>7.?[01])\b/i;
const CHANNEL_6_EXP: RegExp = /\b(?<six>(6[\W]0(?:ch)?)(?=[^\d]|$)|(5[\W][01](?:ch)?)(?=[^\d]|$)|5ch|6ch)\b/i;
const CHANNEL_2_EXP: RegExp = /(?<stereo>((2[\W]0(?:ch)?)(?=[^\d]|$))|(stereo))/i;
const CHANNEL_1_EXP: RegExp = /(?<mono>(1[\W]0(?:ch)?)(?=[^\\d]|$)|(mono)|(1ch))/i;

/** Merging all the channels expressions into one */
const CHANNEL_EXP: RegExp = new RegExp([
    CHANNEL_8_EXP.source,
    CHANNEL_6_EXP.source,
    CHANNEL_2_EXP.source,
    CHANNEL_1_EXP.source
].join('|'), 'i');

/** Enumeration of all possible channel */
export const enum Channel {
    SEVEN   = "7.1",
    SIX     = "5.1",
    STEREO  = "stereo",
    MONO    = "mono"
};

/**
 * Retreive the audio channel from the title
 * @param title - The title containing the audio channel information
 * @returns An object containing optional 'channels' and 'source' if a channel
 * is found.
 */
export function parseAudioChannels(title: string): { channels?: Channel; source?: string } {
    // Execute the regular expression to the title
    const result: RegExpExecArray | null = CHANNEL_EXP.exec(title);

    // If no the regex execution failed or nothing found
    if (!result || !result.groups) {
        return {};
    }

    // Destructurate groups from the result
    const { groups } = result;

    // if the title as matched with the 8 channels expression
    if (groups?.eight) {
        return { channels: Channel.SEVEN, source: groups.eight };
    }

    // if the title as matched with the 6 channels expression
    if (groups?.six) {
        return { channels: Channel.SIX, source: groups.six };
    }

    // if the title as matched with the 2 channels expression
    if (groups?.stereo) {
        return { channels: Channel.STEREO, source: groups.stereo };
    }

    // if the title as matched with the 1 channel expression
    if (groups?.mono) {
        return { channels: Channel.MONO, source: groups.mono };
    }
    
    // If no channel regex match, return an empty object
    return {};
}
