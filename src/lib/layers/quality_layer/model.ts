import { createEvent, createStore } from 'effector';
import { Level } from 'hls.js';

type TQualityWidths = {
  '144p'?: Level | null;
  '240p'?: Level | null;
  '480p'?: Level | null;
  '720p'?: Level | null;
  '1080p'?: Level | null;
  '2k'?: Level | null;
  '4k'?: Level | null;
};

const $qualities = createStore<TQualityWidths | null>(null);

const setQualities = createEvent<TQualityWidths>();

$qualities.on(setQualities, (_, q) => q);

export { $qualities, setQualities, type TQualityWidths };
