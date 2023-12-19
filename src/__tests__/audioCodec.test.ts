import { parseAudioCodec } from '../audioCodec';

test('Dolby Digital Audio Codec', function(){
  expect(parseAudioCodec("Thor.Ragnarok.2017.multi.VFF.2160p.UHD.Bluray.remux.HDR.HEVC.AC3-PLUS.7.1.TrueHD-Atmos.7.1-Ki0squ3").codec).toBe("Dolby Digital");
})
