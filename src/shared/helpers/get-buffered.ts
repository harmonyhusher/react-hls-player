import { TBuffered } from '../../lib/layers/progress_layer/model';

export const getBuffered = (video: HTMLVideoElement): TBuffered => {
  const buffered = video.buffered;
  const bufferedTime: [{ start: number; end: number }] = [{ start: 0, end: 0 }];
  const time = Math.floor(video.currentTime);

  for (let a = 0; a < buffered.length; a++) {
    bufferedTime.push({ start: buffered.start(a), end: buffered.end(a) });
  }

  const item = bufferedTime.find((buffered) => time >= buffered.start && time < buffered.end);

  const activeBufferedTime = item ? (item.end / video.duration) * 100 : 0;
  const activeBufferedSeconds = item?.end ? item?.end : 0;

  return [bufferedTime, activeBufferedTime, activeBufferedSeconds];
};
