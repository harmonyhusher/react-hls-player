import { createStore } from 'effector';

import { setCurrentTime, setDuration } from '../../provider/events';

const $duration = createStore<number>(0);
const $currentTime = createStore<number>(0);

$duration.on(setDuration, (_, d) => d);
$currentTime.on(setCurrentTime, (_, t) => t);

export { $duration };
