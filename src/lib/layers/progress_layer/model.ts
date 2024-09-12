import { createEvent, createStore } from 'effector';

import { setCurrentTime, setDuration } from '../../provider/hls_provider/events';

export type TBuffered = [{ start: number; end: number }[], number, number];

const $duration = createStore<number>(0);
const $currentTime = createStore<number>(0);
const $progress = createStore<number>(0);
const $bufferState = createStore<TBuffered>([[{ start: 0, end: 0 }], 0, 0]);

const $isDragging = createStore<boolean>(false);

const setIsDragging = createEvent<boolean>();

const setProgress = createEvent<number>();
const setBuffered = createEvent<TBuffered>();

$isDragging.on(setIsDragging, (_, d) => d);

$bufferState.on(setBuffered, (_, b) => b);
$duration.on(setDuration, (_, d) => d);
$currentTime.on(setCurrentTime, (_, t) => t);
$progress.on(setProgress, (_, p) => p);

// sample({
//   source: $bufferState,
//   clock: $videoElement,
//   fn: (_, { videoElement }) => videoElement && getBuffered(videoElement),
// });

// sample({
//   clock: setBuffered,
//   source: $bufferState,
// target: ((s, _) => )
// }
// )

export {
  $duration,
  $bufferState,
  setBuffered,
  $currentTime,
  setCurrentTime,
  setDuration,
  setIsDragging,
  $isDragging,
  setProgress,
  $progress,
};
