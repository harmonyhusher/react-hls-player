import React, { useEffect } from 'react';

import { useUnit } from 'effector-react';

import { Thumb } from '../../../shared/components/thumb/thumb';
import { $currentTime, $duration, $isDragging, $progress, setCurrentTime, setIsDragging, setProgress } from './model';
import s from './progress_bar.module.scss';
import { $videoElement } from '../../provider/model';
import { useCurrentTime } from './use-current-time';

export const ProgressLayer = () => {
  const [duration, currentTime, isDragging, { videoElement }, progress] = useUnit([
    $duration,
    $currentTime,
    $isDragging,
    $videoElement,
    $progress,
  ]);

  const [setDragging, setTime] = useUnit([setIsDragging, setCurrentTime, setProgress]);

  const progressBarRef = React.useRef<HTMLDivElement>(null);

  const handleDown = (event: React.PointerEvent) => {
    setDragging(true);

    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const timeTo = (x / rect.width) * duration;

      setTime(timeTo);
    }
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!event.buttons || !progressBarRef.current) {
      return;
    }

    if (isDragging) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const timeTo = (x / rect.width) * duration;

      if (timeTo < 0 || timeTo >= duration) {
        return;
      }

      setTime(timeTo);
    }
  };

  const handleUp = () => {
    setDragging(false);
  };

  console.log(progress);

  useEffect(() => {
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handleUp);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handleUp);
    };
  }, [isDragging]);

  return (
    <div className={s.progress_bar_wrapper} onPointerDown={handleDown} ref={progressBarRef}>
      <div className={s.progress_bar}>
        <div
          className={s.thumb_progress}
          style={{
            width: `${(progress / duration) * 100}%`,
          }}
        />
        <Thumb isDragging={isDragging} />
      </div>
    </div>
  );
};
