import { parseAudioChannels } from '../audioChannels';

test('7.1 Audio Channels', function(){
  expect(parseAudioChannels("Thor.Ragnarok.2017.multi.VFF.2160p.UHD.Bluray.remux.HDR.HEVC.AC3-PLUS.7.1.TrueHD-Atmos.7.1-Ki0squ3").channels).toBe("7.1");
})

test('5.1 Audio Channels', function(){
  expect(parseAudioChannels("Thor.Ragnarok.2017.multi.VFF.2160p.UHD.Bluray.remux.HDR.HEVC.AC3-PLUS.5.1.TrueHD-Atmos.7.1-Ki0squ3").channels).toBe("5.1");
})

test('Stereo Audio Channels', function(){
  expect(parseAudioChannels("Thor.Ragnarok.2017.multi.VFF.2160p.UHD.Bluray.remux.HDR.HEVC.AC3-PLUS.STEREO.TrueHD-Atmos.7.1-Ki0squ3").channels).toBe("stereo");
})

test('Mono Audio Channels', function(){
  expect(parseAudioChannels("Thor.Ragnarok.2017.multi.VFF.2160p.UHD.Bluray.remux.HDR.HEVC.AC3-PLUS.MONO.TrueHD-Atmos.7.1-Ki0squ3").channels).toBe("mono");
})
