/** Regular expression to find video codec */
const VC_X265_EXP: RegExp       = /(?<x265>x265)/i;
const VC_H265_EXP: RegExp       = /(?<h265>h265)/i;
const VC_X264_EXP: RegExp       = /(?<x264>x264)/i;
const VC_H264_EXP: RegExp       = /(?<h264>h264)/i;
const VC_WMV_EXP: RegExp        = /(?<wmv>WMV)/i;
const VC_XVIDHD_EXP: RegExp     = /(?<xvidhd>XvidHD)/i;
const VC_XVID_EXP: RegExp       = /(?<xvid>X-?vid)/i;
const VC_DIVX_EXP: RegExp       = /(?<divx>divx)/i;
const VC_HEVC_EXP: RegExp       = /(?<hevc>HEVC)/i;

/** Merging all the codec expressions into one */
const VIDEO_CODEC_EXP: RegExp = new RegExp([
    VC_X265_EXP.source,
    VC_H265_EXP.source,
    VC_X264_EXP.source,
    VC_H264_EXP.source,
    VC_WMV_EXP.source,
    VC_XVIDHD_EXP.source,
    VC_XVID_EXP.source,
    VC_DIVX_EXP.source,
    VC_HEVC_EXP.source
].join('|'), 'i');

/** Enumeration of all possible video codec */
export const enum VideoCodec {
    X265    = "x265",
    X264    = "x264",
    H264    = "h264",
    H265    = "h265",
    WMV     = "WMV",
    XVID    = "xvid",
    DVDR    = "dvdr"
}

/**
 * Retreive the video codec from the title
 * @param title - The title containing the video codec information
 * @returns An object containing optional 'codec' and 'source' if a codec
 * is found.
 */
export function parseVideoCodec(title: string): { codec?: VideoCodec; source?: string} {
    // Execute the regular expression to the title
    const result: RegExpExecArray | null = VIDEO_CODEC_EXP.exec(title);

    // If no the regex execution failed or nothing found
    if (!result || !result.groups) {
        return {};
    }

    // Destructurate groups from the result
    const { groups } = result;

    // if the title as matched with the H264 codec expression
    if (groups?.h264) {
        return { codec: VideoCodec.H264, source: groups.h264 };
    }

    // if the title as matched with the X264 codec expression
    if (groups?.x264) {
        return { codec: VideoCodec.X264, source: groups.x264 };
    }

    // if the title as matched with the H265 codec expression
    if (groups?.h265) {
        return { codec: VideoCodec.H265, source: groups.h265 };
    }

    // if the title as matched with the X265 codec expression
    if (groups?.x265) {
        return { codec: VideoCodec.X265, source: groups.x265 };
    }

    // if the title as matched with the XVID codec expression
    if (groups?.xvidhd ?? groups?.xvid ?? groups?.divx) {
        return { codec: VideoCodec.XVID, source: (groups?.xvidhd ?? groups?.xvid ?? groups?.divx) };
    }

    // if the title as matched with the VMW codec expression
    if (groups?.wmv) {
        return { codec: VideoCodec.WMV, source: groups.wmv };
    }

    // if the title as matched with the DVDR codec expression
    if (groups?.dvdr) {
        return { codec: VideoCodec.DVDR, source: groups.dvdr };
    }

    // If no codec regex match, return an empty object
    return {};
}
