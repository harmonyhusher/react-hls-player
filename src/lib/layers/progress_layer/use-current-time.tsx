import { useUnit } from 'effector-react';
import { $isDragging, setCurrentTime } from './model';
import { $player, $videoElement } from '../../provider/hls_provider/model';
import { useEffect, useLayoutEffect, useRef } from 'react';

export const useCurrentTime = () => {
  const currentTimeRef = useRef<ReturnType<typeof setInterval>>(0);
  const [isDragging, { isPlaying }, { videoElement }] = useUnit([$isDragging, $player, $videoElement]);

  useUnit(setCurrentTime);

  // useLayoutEffect(() => {
  //   if (isDragging && currentTimeRef.current) {
  //     clearInterval(currentTimeRef.current);
  //   }

  //   if (!isDragging) {
  //     currentTimeRef.current = setInterval(() => {
  //       if (videoElement) {
  //         setCurrentTime(videoElement?.currentTime);
  //       }
  //     }, 1000);
  //   }
  // }, [isDragging]);

  useEffect(() => {
    if (!isPlaying) {
      clearInterval(currentTimeRef.current);
    }

    const handleTimeUpdate = () => {
      currentTimeRef.current = setInterval(() => {
        console.log(videoElement?.currentTime);
        if (videoElement) {
          setCurrentTime(Math.round(videoElement?.currentTime));
        }
      }, 1000);
    };

    handleTimeUpdate();

    return () => {
      clearInterval(currentTimeRef.current);
    };
  }, [isPlaying]);
};
