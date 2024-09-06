import React, { useEffect } from 'react';

import { useUnit } from 'effector-react';

import { Thumb } from '../../../shared/components/thumb/thumb';
import { $currentTime, $duration, $isDragging, $progress, setCurrentTime, setIsDragging, setProgress } from './model';
import s from './progress_bar.module.scss';
import { $videoElement } from '../../provider/hls_provider/model';
import { useCurrentTime } from './use-current-time';
import { getTime } from '../../../shared/helpers/get-move-timestamp';

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
      const timeTo = getTime({ rect: progressBarRef.current.getBoundingClientRect(), event, duration });

      setTime(timeTo);
    }
  };

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
    setDragging(false);

    if (!isDragging && progressBarRef.current) {
      const timeTo = getTime({ rect: progressBarRef.current.getBoundingClientRect(), event, duration });

      if (timeTo < 0 || timeTo >= duration) {
        return;
      }

      setTime(timeTo);
    }
  };

  useEffect(() => {
    document.addEventListener('pointermove', handlePointerMove);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isDragging]);

  return (
    <div className={s.progress_bar_wrapper} onPointerUp={handleUp} onPointerDown={handleDown} ref={progressBarRef}>
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
