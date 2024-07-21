import { useUnit } from 'effector-react';

import { $duration } from './model';

export const ProgressBar = () => {
  const duration = useUnit($duration);
  console.log(duration, 'durationProgressBar');
  return (
    <input
      max={duration}
      min="0"
      //   onChange={handleProgressChange}
      style={{ width: '100%' }}
      type="range"
      value={duration}
    />
  );
};
