import { createEvent, createStore } from 'effector';

import { setCurrentTime, setDuration } from '../../provider/events';

const $duration = createStore<number>(0);
const $currentTime = createStore<number>(0);

const $isDragging = createStore<boolean>(false);
const $dragStartX = createStore<number>(0);
const $dragStartValue = createStore<number>(0);

const setIsDragging = createEvent<boolean>();
const setDragStartX = createEvent<number>();
const setDragStartValue = createEvent<number>();

$isDragging.on(setIsDragging, (_, d) => d);

$dragStartX.on(setDragStartX, (_, d) => d);

$dragStartValue.on(setDragStartX, (_, d) => d);

$duration.on(setDuration, (_, d) => d);
$currentTime.on(setCurrentTime, (_, t) => t);

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
};
