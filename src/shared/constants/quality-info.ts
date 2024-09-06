import { TQualityWidths } from '../../lib/layers/quality_layer/model';

type TLevel = {
  bitrate: number;
  width: number;
  url: string;
};

const qualityRanges: { max: number; quality: keyof TQualityWidths }[] = [
  { max: 239, quality: '144p' },
  { max: 479, quality: '240p' },
  { max: 719, quality: '480p' },
  { max: 1079, quality: '720p' },
  { max: 1439, quality: '1080p' },
  { max: 1919, quality: '2k' },
  { max: 3839, quality: '4k' },
];

export { qualityRanges, type TLevel };
