/** Regular expression to find audio channels */
const AC_MP3_EXP: RegExp            = /\b(?<mp3>(LAME(?:\d)+-?(?:\d)+)|(mp3))\b/i;
const AC_MP2_EXP: RegExp            = /\b(?<mp2>(mp2))\b/i;
const AC_DOLBY_EXP: RegExp          = /\b(?<dolby>(Dolby)|(Dolby-?Digital)|(DD)|(AC3D?))\b/i;
const AC_DOLBY_ATMOS_EXP: RegExp    = /\b(?<dolbyatmos>(Dolby-?Atmos))\b/i;
const AC_AAC_EXP: RegExp            = /\b(?<aac>(AAC))(\d?.?\d?)(ch)?\b/i;
const AC_EAC3_EXP: RegExp           = /\b(?<eac3>(EAC3|DDP|DD\+))\b/i;
const AC_FLAC_EXP: RegExp           = /\b(?<flac>(FLAC))\b/i;
const AC_DTS_EXP: RegExp            = /\b(?<dts>(DTS))\b/i;
const AC_DTS_HD_EXP: RegExp         = /\b(?<dtshd>(DTS-?HD)|(DTS(?=-?MA)|(DTS-X)))\b/i;
const AC_TRUE_HD_EXP: RegExp        = /\b(?<truehd>(True-?HD))\b/i;
const AC_OPUS_EXP: RegExp           = /\b(?<opus>(Opus))\b/i;
const AC_VORBIS_EXP: RegExp         = /\b(?<vorbis>(Vorbis))\b/i;
const AC_PCM_EXP: RegExp            = /\b(?<pcm>(PCM))\b/i;
const AC_LPCM_EXP: RegExp           = /\b(?<lpcm>(LPCM))\b/i;

/** Merging all the codec expressions into one */
const AUDIO_CODEC_EXP: RegExp = new RegExp([
    AC_MP3_EXP.source,
    AC_MP2_EXP.source,
    AC_DOLBY_EXP.source,
    AC_DOLBY_ATMOS_EXP.source,
    AC_AAC_EXP.source,
    AC_EAC3_EXP.source,
    AC_FLAC_EXP.source,
    AC_DTS_EXP.source,
    AC_DTS_HD_EXP.source,
    AC_TRUE_HD_EXP.source,
    AC_OPUS_EXP.source,
    AC_VORBIS_EXP.source,
    AC_PCM_EXP.source,
    AC_LPCM_EXP.source
].join('|'), 'i');

/** Enumeration of all possible audio codec */
export const enum AudioCodec {
    MP3     = "MP3",
    MP2     = "MP2",
    DOLBY   = "Dolby Digital",
    EAC3    = "Dolby Digital Plus",
    AAC     = "AAC",
    FLAC    = "FLAC",
    DTS     = "DTS",
    DTSHD   = "DTS-HD",
    TRUEHD  = "Dolby TrueHD",
    OPUS    = "Opus",
    VORBIS  = "Vorbis",
    PCM     = "PCM",
    LPCM    = "LPCM"
};

/**
 * Retreive the audio codec from the title
 * @param title - The title containing the audio codec information
 * @returns An object containing optional 'codec' and 'source' if a codec
 * is found.
 */
export function parseAudioCodec(title: string): { codec?: AudioCodec; source?: string } {
    // Execute the regular expression to the title
    const result: RegExpExecArray | null = AUDIO_CODEC_EXP.exec(title);

    // If no the regex execution failed or nothing found
    if (!result || !result.groups) {
        return {};
    }

    // Destructurate groups from the result
    const { groups } = result;

    // if the title as matched with the AAC codec expression
    if (groups?.acc) {
        return { codec: AudioCodec.AAC, source: groups.aac };
    }

    // if the title as matched with the EAC3 codec expression
    if (groups?.dolbyatmos) {
        return { codec: AudioCodec.EAC3, source: groups.dolbyatmos };
    }

    // if the title as matched with the DOLBY codec expression
    if (groups?.dolby) {
        return { codec: AudioCodec.DOLBY, source: groups.dolby };
    }

    // if the title as matched with the DTS HD codec expression
    if (groups?.dtshd) {
        return { codec: AudioCodec.DTSHD, source: groups.dtshd };
    }

    // if the title as matched with the DTS codec expression
    if (groups?.dts) {
        return { codec: AudioCodec.DTS, source: groups.dts };
    }

    // if the title as matched with the FLAC codec expression
    if (groups?.flac) {
        return { codec: AudioCodec.FLAC, source: groups.flac };
    }

    // if the title as matched with the TRUE HD codec expression
    if (groups?.truehd) {
        return { codec: AudioCodec.TRUEHD, source: groups.truehd };
    }

    // if the title as matched with the MP3 codec expression
    if (groups?.mp3) {
        return { codec: AudioCodec.MP3, source: groups.mp3 };
    }

    // if the title as matched with the MP2 codec expression
    if (groups?.mp2) {
        return { codec: AudioCodec.MP2, source: groups.mp2 };
    }

    // if the title as matched with the PCM codec expression
    if (groups?.pcm) {
        return { codec: AudioCodec.PCM, source: groups.pcm };
    }

    // if the title as matched with the LPCM codec expression
    if (groups?.lpcm) {
        return { codec: AudioCodec.LPCM, source: groups.lpcm };
    }

    // if the title as matched with the OPUS codec expression
    if (groups?.opus) {
        return { codec: AudioCodec.OPUS, source: groups.opus };
    }

    // if the title as matched with the VORBIS codec expression
    if (groups?.vorbis) {
        return { codec: AudioCodec.VORBIS, source: groups.vorbis };
    }

    // If no codec regex match, return an empty object
    return {};
}
