import { createEvent, createStore, sample } from 'effector';

import { setCurrentTime, setDuration } from '../../provider/events';
import { $videoElement } from '../../provider/model';

const $duration = createStore<number>(0);
const $currentTime = createStore<number>(0);
const $progress = createStore<number>(0);

const $isDragging = createStore<boolean>(false);
const $dragStartX = createStore<number>(0);
const $dragStartValue = createStore<number>(0);

const setIsDragging = createEvent<boolean>();
const setDragStartX = createEvent<number>();
const setDragStartValue = createEvent<number>();

const setProgress = createEvent<number>();

$isDragging.on(setIsDragging, (_, d) => d);

$dragStartX.on(setDragStartX, (_, d) => d);

$dragStartValue.on(setDragStartX, (_, d) => d);

$duration.on(setDuration, (_, d) => d);
$currentTime.on(setCurrentTime, (_, t) => t);
$progress.on(setProgress, (_, p) => p);

// sample({
//   clock: setCurrentTime,
//   source: $currentTime,
//   fn: (src, clk) => {
//     console.log(src, clk);
//     if (src + clk >= $duration.getState()) {
//       return $duration.getState();
//     }
//     if (src - clk <= $duration.getState()) {
//       return 0;
//     }
//   },
// });

export {
  $duration,
  $currentTime,
  setCurrentTime,
  setDragStartValue,
  setDragStartX,
  setDuration,
  setIsDragging,
  $isDragging,
  $dragStartValue,
  $dragStartX,
  setProgress,
  $progress,
};
