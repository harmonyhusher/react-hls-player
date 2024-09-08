import React, { useEffect, useLayoutEffect } from 'react';

import { useUnit } from 'effector-react';

import { Thumb } from '../../../shared/components/thumb/thumb';
import { getTime } from '../../../shared/helpers/get-move-timestamp';
import {
  $bufferState,
  $currentTime,
  $duration,
  $isDragging,
  $progress,
  setCurrentTime,
  setIsDragging,
  setProgress,
} from './model';
import s from './progress_bar.module.scss';

export const ProgressLayer = () => {
  const [duration, isDragging, progress, buffered] = useUnit([$duration, $isDragging, $progress, $bufferState]);
  useUnit([setIsDragging, setCurrentTime, setProgress]);

  const progressBarRef = React.useRef<HTMLDivElement>(null);

  const handleDown = (event: React.PointerEvent) => {
    setIsDragging(true);

    if (progressBarRef.current) {
      const timeTo = getTime({ rect: progressBarRef.current.getBoundingClientRect(), event, duration });

      setCurrentTime(timeTo);
    }
  };
  console.log(buffered);
  const handlePointerMove = (event: React.PointerEvent | PointerEvent) => {
    if (!event.buttons || !progressBarRef.current) {
      return;
    }

    if (isDragging) {
      const timeTo = getTime({ rect: progressBarRef.current.getBoundingClientRect(), event, duration });

      if (timeTo < 0 || timeTo >= duration) {
        return;
      }

      setProgress(timeTo);
    }
  };

  const handleUp = (event: React.PointerEvent) => {
    setIsDragging(false);

    if (!isDragging && progressBarRef.current) {
      const timeTo = getTime({ rect: progressBarRef.current.getBoundingClientRect(), event, duration });

      if (timeTo < 0 || timeTo >= duration) {
        return;
      }

      setCurrentTime(timeTo);
    }
  };

  useLayoutEffect(() => {
    document.addEventListener('pointermove', handlePointerMove);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isDragging]);

  return (
    <div className={s.progress_bar_wrapper} onPointerDown={handleDown} onPointerUp={handleUp} ref={progressBarRef}>
      <div className={s.progress_bar}>
        <div
          className={s.thumb_buffered}
          style={{
            width: `${(buffered[0].end / duration) * 100}%`,
          }}
        />
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
