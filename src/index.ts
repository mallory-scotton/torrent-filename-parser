import { parseAudioChannels, Channel } from './audioChannels';
import { parseAudioCodec, AudioCodec } from './audioCodec';

export function filenameParse(title: string): {
    title?: string,
    audioCodec?: AudioCodec,
    audioChannels?: Channel
} {
    return {};
}
